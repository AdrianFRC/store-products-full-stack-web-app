<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product);
        }
        return response()->json(['message' => 'Product not found'], 404);
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($request->all());
            return response()->json($product);
        }
        return response()->json(['message' => 'Product not found'], 404);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Product deleted']);
        }
        return response()->json(['message' => 'Product not found'], 404);
    }

    public function productsByStore($storeId)
    {
        $products = Product::where('store_id', $storeId)->get();
        return response()->json($products);
    }
}
