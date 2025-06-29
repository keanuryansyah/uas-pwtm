<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginUserController extends Controller
{
    public function index()
    {
        // Jika user sudah login
        if (Auth::check()) {
            return redirect('/');
        }

        // Jika user belum login
        return view('login-user');
    }
}
