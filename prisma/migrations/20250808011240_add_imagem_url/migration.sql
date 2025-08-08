/*
  Warnings:

  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `produtoId` on the `PedidoProduto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."PedidoProduto" DROP CONSTRAINT "PedidoProduto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Produto" DROP CONSTRAINT "Produto_categoriaId_fkey";

-- AlterTable
ALTER TABLE "public"."PedidoProduto" DROP COLUMN "produtoId",
ADD COLUMN     "produtoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Produto" DROP CONSTRAINT "Produto_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "categoriaId" DROP NOT NULL,
ADD CONSTRAINT "Produto_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoProduto" ADD CONSTRAINT "PedidoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
