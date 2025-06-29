@props(['title'])

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{$title ?? 'Default'}}</title>

    <!-- GLOBAL CSS -->
    <link rel="stylesheet" href="{{asset('css/global.css')}}">

    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <!-- CUSTOM CSS -->
    @stack('styles')

    <script src="https://unpkg.com/feather-icons"></script>


</head>

<body class="xyz_us-{{ Auth::user()->id ?? '' }}">

    <div class="media-files-box">
        <div class="media-files-ctn">
            <div class="close-button-media-files">
                <span>X</span>
            </div>
            <div class="mfc-row1-wr">
                <button type="button" class="button green-btn" data-btn="upload-files">Upload File</button>
                <button type="button" class="button red-btn" data-btn="uploaded-files">Uploaded Files</button>
            </div>
            <div class="mfc-row2-wr">
                <div id="mfc-row2-full-images" class="mfc-row2 selected" data-ctn="uploaded-files">
                    @foreach($mediaFiles as $mediaFile)
                    <div class="mfc">
                        <img class="image-product" src="{{asset($mediaFile->file_path)}}" alt="">
                    </div>
                    @endforeach
                </div>
                <div id="mfc-row2-upload" class="mfc-row2" data-ctn="upload-files">
                    <h2>Upload File</h2>
                    <input type="file" id="upload-image">
                </div>
            </div>
        </div>
    </div>

    <main>
        {{$slot}}
    </main>

    <!-- GLOBAL JS -->
    <script src=" {{asset('js/global.js')}}"></script>
    <script>
        feather.replace();
    </script>

    <!-- CUSTOM JS -->
    @stack('scripts')
</body>

</html>