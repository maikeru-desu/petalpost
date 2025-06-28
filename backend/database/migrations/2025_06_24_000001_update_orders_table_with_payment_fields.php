<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Add payment related fields
            $table->string('status')->default('pending')->after('total');
            $table->string('payment_intent_id')->nullable()->after('status');
            $table->string('payment_status')->nullable()->after('payment_intent_id');
            $table->string('payment_method')->nullable()->after('payment_status');
            $table->text('billing_address')->nullable()->after('payment_method');
            $table->text('shipping_address')->nullable()->after('billing_address');
            $table->string('tracking_number')->nullable()->after('shipping_address');
            $table->dateTime('shipped_at')->nullable()->after('tracking_number');
            $table->dateTime('delivered_at')->nullable()->after('shipped_at');
            $table->dateTime('cancelled_at')->nullable()->after('delivered_at');
            $table->text('cancellation_reason')->nullable()->after('cancelled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'payment_intent_id',
                'payment_status',
                'payment_method',
                'billing_address',
                'shipping_address',
                'tracking_number',
                'shipped_at',
                'delivered_at',
                'cancelled_at',
                'cancellation_reason',
            ]);
        });
    }
};
