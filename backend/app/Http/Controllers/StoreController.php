<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRequest;

class StoreController extends Controller
{
    public function index()
    {
        return response()->json(Store::all());
    }

    public function show($id)
    {
        $store = Store::find($id);
        if ($store) {
            return response()->json($store);
        }
        return response()->json(['message' => 'Store not found'], 404);
    }

    public function store(StoreRequest $request)
    {
        $store = Store::create($request->all());
        return response()->json($store, 201);
    }

    public function update(StoreRequest $request, $id)
    {
        $store = Store::find($id);
        if ($store) {
            $store->update($request->all());
            return response()->json($store);
        }
        return response()->json(['message' => 'Store not found'], 404);
    }

    public function destroy($id)
    {
        $store = Store::find($id);
        if ($store) {
            $store->products()->delete();
            $store->delete();
            return response()->json(['message' => 'Store deleted']);
        }
        return response()->json(['message' => 'Store not found'], 404);
    }
}
