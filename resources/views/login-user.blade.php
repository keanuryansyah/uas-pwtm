@push('styles')
<link rel="stylesheet" href="{{asset('css/login.css')}}">
@endpush

<x-layout title="Login">
    <section id="login-sec" class="section">
        <div class="container">
            <div id="login-ctn" class="content">
                <div class="logo">
                    <img src="{{asset('images/logo.png')}}" alt="">
                </div>
                <form id="login-form" action="/dominic" method="post">
                    @if(session()->has('LoginError'))
                    <div class="invalid-feedback">
                        <i class="fa-regular fa-circle-xmark"></i>
                        {{ session('LoginError') }}
                    </div>
                    @endif
                    @csrf
                    <div id="lfc-r1" class="lfc">
                        <label for="username-inp">
                            Username:
                        </label>
                        <input id="username-inp" type="text" name="login" class="no-outline" value="{{old('login')}}" autofocus>
                    </div>
                    <div id="lfc-r2" class="lfc">
                        <label for="password-inp">
                            Password:
                        </label>
                        <input id="password-inp" type="password" name="password" class="no-outline" autocomplete="off"
                            required>
                        <div class="show-pw">Show</div>
                    </div>
                    <div id="lfc-r3" class="lfc">
                        <label for="remember-inp">
                            Remember me
                        </label>
                        <input id="remember-inp" type="checkbox" name="remember" autocomplete="off">
                    </div>
                    <button id="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    </section>

    @push('scripts')
    <script src="{{asset('js/login.js')}}"></script>
    @endpush

</x-layout>