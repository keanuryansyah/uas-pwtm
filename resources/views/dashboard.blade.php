@push('styles')

<link rel="stylesheet" href="{{asset('css/side-dashboard.css')}}">
<link rel="stylesheet" href="{{asset('css/dashboard.css')}}">

@endpush


<x-side-dashboard></x-side-dashboard>
<x-layout title="Dashboard" :userLogined="session('userLogined')">
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
                                <span>Rp217.000</span>
                            </div>
                        </div>
                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-regular fa-folder-open"></i>
                                <span>Today's Order</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>214</span>
                            </div>
                        </div>
                        <div class="kotak-child">
                            <div class="kotak-child-row1 kcr">
                                <i class="fa-solid fa-hourglass-half"></i>
                                <span>Today's Pending</span>
                            </div>
                            <div class="kotak-child-row2 kcr">
                                <span>3</span>
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
</x-layout>