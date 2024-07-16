<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name','image','description','price', 'sku', 'store_id'
    ];
    public function store():BelongsTo{
        return $this->belongsTo(Store::class);
    }
}
