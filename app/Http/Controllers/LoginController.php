<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\MenuItem;
use Carbon\Carbon;
use App\Models\Order;

class LoginController extends Controller
{

    public function authenticate(Request $request)
    {
        // Validasi data login
        $validator = Validator::make($request->all(), [
            'login' => 'required|string|min:3|max:50',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return back()->with('LoginError', 'Username or Password is Incorrect');
        }

        $credentials = $validator->validated();
        $loginField = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        $loginAttempt = [
            $loginField => $credentials['login'],
            'password' => $credentials['password'],
        ];

        if (Auth::attempt($loginAttempt)) {
            $request->session()->regenerate();

            $user = Auth::user();
            return $user->role === 'admin'
                ? redirect()->intended('/dashboard')
                : redirect('/');
        }

        return back()->with('LoginError', 'Username or Password is Incorrect.');
    }




    public function logout(Request $request)
    {
        // User logout
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function checking()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return redirect('/');
        }

        $today = Carbon::today();

        $todayRevenue = Order::whereDate('created_at', $today)
            ->where('status', 'paid')
            ->sum('total_price');

        $todayOrder = Order::whereDate('created_at', $today)->count();

        $todayPending = Order::whereDate('created_at', $today)
            ->where('status', 'pending')
            ->count();

        $totalMenu = MenuItem::count();

        $orders = Order::orderBy('created_at', 'desc')->get();

        return view('dashboard', [
            'totalMenu' => $totalMenu,
            'todayRevenue' => $todayRevenue,
            'todayOrder' => $todayOrder,
            'todayPending' => $todayPending,
            'orders' => $orders
        ]);
    }
}
