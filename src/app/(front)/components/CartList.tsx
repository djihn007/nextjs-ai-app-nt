"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return <div className="mt-20 text-center text-[#797067]">Cart is empty...</div>
  }

  return (
    <div className="mx-auto max-w-4xl mt-20">
      <h1 className="mb-6 text-2xl font-bold tracking-[-0.025em] text-[#423D38]">Cart</h1>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                items.map((i) => (
                    <TableRow key={i.productId}>
                        <TableCell>{i.productId}</TableCell>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.price}</TableCell>
                        <TableCell>{i.qty}</TableCell>
                        <TableCell>{(i.price * i.qty).toFixed(2)}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => { removeItem(i.productId); } } size="sm">
                                <Trash className="size-3.5" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>

      <div className="mt-8 text-right">
          <div className="text-2xl font-bold text-[#423D38]">
               Total: {totalPrice.toFixed(2)}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => { clearCart(); }}>Clear Cart</Button>
            <Button onClick={() => {
                clearCart();
                router.replace('/product');
             }}>Confirm Order</Button>
          </div>
      </div>

    </div>
  );
}
