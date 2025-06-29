<sidebar id="dc-col1" class="dc">
    <section id="side-dash-section" class="section">
        <div class="container">
            <div id="side-dash-ctn">
                <div id="sdc-row1" class="sdc">
                    <a href="/">
                        <img src="{{asset('images/logo.png')}}" alt="">
                        <span id="my-dashboard">Visit Site</span>
                    </a>
                </div>
                <div id="sdc-row2" class="sdc sdc-w-icon">
                    <div id="sdc-r2-row1" class="sdc-child">
                        <div class="sdc-btn">
                            <a href="/dashboard">
                                <i class="fa-solid fa-gauge"></i>
                                <span class="side-dash-btn" data-btn="dashboard">Dashboard</span>
                            </a>
                        </div>
                        <div class="sdc-btn">

                            <a href="/menu-management">

                                <i class="fa-solid fa-utensils"></i>
                                <span class="side-dash-btn" data-btn="produk-management">Menu Management</span>
                            </a>
                        </div>
                    </div>
                    <form action="/logout" method="post">
                        @csrf
                        <button type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</sidebar>