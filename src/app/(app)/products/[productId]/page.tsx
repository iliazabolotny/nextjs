import { Suspense } from "react";
import notFound from "./not-found";
import { Metadata } from "next";
import { getMetaProductById } from "@/services/get-meta-product-by-id";
import { ProductContainer } from "@/components/product-container/product-container";
import Loading from "./loading";

type Props = {
  params: Promise<{ productId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { productId } = await params;

  const result = await getMetaProductById({ id: productId });

  if (result.isError || !result.data) {
    return {
      title: "Notebook",
      description: "Notebook description",
    };
  }

  return {
    title: result.data.name,
    description: result.data.description,
  };
};

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  const { data: notebookMeta, isError: isNotebookMetaError } =
    await getMetaProductById({ id: productId });

  if (isNotebookMetaError) {
    throw new Error("Notebook error");
  }

  if (!notebookMeta) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductContainer productId={productId} />
    </Suspense>
  );
}
