<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MediaFiles;
use Requests;

class MediaFilesController extends Controller
{
    public function index()
    {

        $images = MediaFiles::all();

        return view('media-files', [
            'images' => $images
        ]);
    }

    public function upload_file(Request $request)
    {
        $request->validate([
            'image_prod' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image_prod')) {
            $file = $request->file('image_prod');
            $filename = $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);

            // Simpan path ke database
            $menu = new MediaFiles();
            $menu->file_path = 'images/' . $filename;
            $menu->save();

            return response()->json([
                'status' => 'success',
                'message' => 'File berhasil diupload dan disimpan',
                'file_path' => $menu->file_path
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'File tidak ditemukan'
        ], 400);
    }
}
