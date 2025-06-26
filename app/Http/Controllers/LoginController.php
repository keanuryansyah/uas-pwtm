<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\MenuItem;

class LoginController extends Controller
{
    public function index()
    {

        // Jika user sudah login
        if (Auth::check()) {
            return redirect('/dashboard');
        }

        // Jika user belum login
        return view('login');
    }

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

        // Cek apakah input adalah email atau username
        $loginField = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        // Coba autentikasi dengan field yang sesuai
        if (Auth::attempt([$loginField => $credentials['login'], 'password' => $credentials['password']])) {



            $userLogined = Auth::id();
            $request->session()->regenerate();
            session(['userLogined' => $userLogined]);

            return redirect()->intended('/dashboard');
        }

        // Jika gagal, kembalikan dengan error
        return back()->with('LoginError', 'Username or Password is Incorrect.');
    }

    public function logout(Request $request)
    {
        // User logout
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/dominic');
    }

    public function checking()
    {
        if (!Auth::check()) {
            return redirect('/dominic');
        }

        $totalMenu = MenuItem::count();

        return view('dashboard', [
            'totalMenu' => $totalMenu
        ]);
    }
}
