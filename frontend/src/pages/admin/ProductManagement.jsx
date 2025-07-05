
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Handmade Ceramic Mug',
    seller: 'Pottery Studio',
    category: 'Home & Kitchen',
    stock: 15,
    price: 24.99,
    status: 'active',
  },
  {
    id: '2',
    name: 'Knitted Wool Scarf',
    seller: 'Woolen Crafts',
    category: 'Clothing & Accessories',
    stock: 8,
    price: 39.99,
    status: 'active',
  },
  {
    id: '3',
    name: 'Wooden Picture Frame',
    seller: 'WoodWorks',
    category: 'Home Decor',
    stock: 20,
    price: 18.50,
    status: 'active',
  },
  {
    id: '4',
    name: 'Woven Wall Hanging',
    seller: 'Textile Arts',
    category: 'Home Decor',
    stock: 5,
    price: 65.00,
    status: 'active',
  },
  {
    id: '5',
    name: 'Leather Journal',
    seller: 'Leather Goods Co.',
    category: 'Stationery',
    stock: 0,
    price: 28.99,
    status: 'out_of_stock',
  },
];

const ProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (productId) => {
    toast({
      title: "Edit Product",
      description: `You would edit product ID: ${productId}`,
    });
  };

  const handleDelete = (productId) => {
    toast({
      title: "Delete Product",
      description: `You would delete product ID: ${productId}`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen bg-ateaze-cream">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-display font-bold text-ateaze-charcoal">Product Management</h1>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.seller}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'default' : 'destructive'}>
                            {product.status === 'active' ? 'Active' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
