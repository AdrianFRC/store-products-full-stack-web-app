<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'address', 'phoneNumber'];
    public function products():HasMany{
        return $this->hasMany(Product::class);
    }
}
