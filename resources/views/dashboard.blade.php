@push('styles')

<link rel="stylesheet" href="{{asset('css/side-dashboard.css')}}">
<link rel="stylesheet" href="{{asset('css/dashboard.css')}}">

@endpush


<x-side-dashboard></x-side-dashboard>
<x-layout title="Dashboard">
    <section id="dashboard" class="section ctn">
        <div class="container">
            <div id="dashboard-ctn">
                <div id="dc-col2" class="dc after-side">
                    <div id="kotak-on-dashboard-pr">
                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-solid fa-money-bill-trend-up"></i>
                                <span>Today's Revenue</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>Rp{{ number_format($todayRevenue, 0, ',', '.') }}</span>
                            </div>
                        </div>

                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-regular fa-folder-open"></i>
                                <span>Today's Order</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>{{ $todayOrder }}</span>
                            </div>
                        </div>

                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-solid fa-hourglass-half"></i>
                                <span>Today's Pending</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>{{ $todayPending }}</span>
                            </div>
                        </div>

                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-solid fa-burger"></i>
                                <span>Menu</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>{{$totalMenu ?? 0}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="table-order-container" style="margin-top: 40px;">
        <h3 style="margin-bottom: 15px;">📋 Detail Orders</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #f3f3f3;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Nomor</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">User ID</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Nama User</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Total Price</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Created At</th>
                </tr>
            </thead>
            <tbody>
                @php $count = 0 @endphp
                @forelse ($orders as $order)
                @php $count++ @endphp
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">{{ $count }}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">{{ $order->id_user }}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">{{ $order->nama_user }}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Rp{{ number_format($order->total_price, 0, ',', '.') }}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">{{ ucfirst($order->status) }}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">{{ $order->created_at->format('Y-m-d H:i') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                        Tidak ada data order.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>


</x-layout>