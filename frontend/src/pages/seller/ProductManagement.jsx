
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from '@/components/seller/SellerSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Mock data for seller products
const sellerProducts = [
  {
    id: '1',
    name: 'Handcrafted Wooden Bowl',
    category: 'Home Decor',
    stock: 2,
    price: 45.99,
    status: 'active',
    featured: true,
  },
  {
    id: '2',
    name: 'Macramé Wall Hanging',
    category: 'Home Decor',
    stock: 3,
    price: 39.99,
    status: 'active',
    featured: false,
  },
  {
    id: '3',
    name: 'Personalized Leather Keychain',
    category: 'Accessories',
    stock: 5,
    price: 18.50,
    status: 'active',
    featured: false,
  },
  {
    id: '4',
    name: 'Hand-Painted Plant Pot',
    category: 'Garden',
    stock: 8,
    price: 29.99,
    status: 'active',
    featured: true,
  },
  {
    id: '5',
    name: 'Knitted Baby Blanket',
    category: 'Baby & Kids',
    stock: 0,
    price: 65.00,
    status: 'out_of_stock',
    featured: false,
  },
];

const SellerProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { toast } = useToast();

  const filteredProducts = sellerProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from products
  const categories = ['all', ...new Set(sellerProducts.map(product => product.category.toLowerCase()))];

  const handleDelete = (productId) => {
    toast({
      title: "Delete Product",
      description: `You would delete product ID: ${productId}`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen bg-ateaze-cream">
      <SellerSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-display font-bold text-ateaze-charcoal">My Products</h1>
            <div>
              <Link to="/seller/products/add">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'default' : 'destructive'}>
                            {product.status === 'active' ? 'Active' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.featured ? 
                            <Badge variant="outline" className="bg-ateaze-sage text-white">Featured</Badge> : 
                            '-'}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/products/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/seller/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
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

export default SellerProductManagement;
