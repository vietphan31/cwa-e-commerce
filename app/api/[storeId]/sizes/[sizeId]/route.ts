import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId)
      return new NextResponse("Size Id is required", { status: 400 });

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });

    if (!params.sizeId)
      return new NextResponse("Size Id is required", { status: 400 });

    const body = await req.json();
    const { name, value } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!value)
      return new NextResponse("Value Url is required", { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });

    if (!params.sizeId)
      return new NextResponse("Size Id is required", { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
