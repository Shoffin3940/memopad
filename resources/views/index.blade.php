<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notes</title>
</head>
<body>
    <div id="nav-top-side" class="d-flex align-items-center justify-content-between p-2 shadow-sm">
        <div id="logo-wrapper"></div>
        <div id="search-wrapper" class="mx-auto">
             <input class="form-control search mb-0" id="search" type="search" placeholder="Cari catatan ..." autocomplete="off">
        </div>
        <div id="night-mode"></div>
    </div>
    <div class="row">
        {{-- Navigation --}}
        <div id="nav-left-side" class="col-2"></div>

        {{-- Content --}}
        <div id="content-wrapper" class="col-10 pt-3">
            <div id="form-area" class="mx-auto text-center">
                <div id="trigger-form" class="d-flex align-items-center p-3 text-start rounded shadow-sm">Masukkan teks...</div>
                <div id="form" class="d-none rounded shadow-sm">
                    <input id="fill-title" class=" fill-title d-block w-100 rounded border-0 p-3 data-content" type="text" name="title" placeholder="Judul">
                    <textarea id="fill-content" class=" d-block w-100 rounded border-0 ps-3 pe-3 data-content" name="content" placeholder="Buat catatan..."></textarea>
                    <div class="d-flex justify-content-end p-2">
                        <button type="button" id="btn-close" class="btn btn-sm">Tutup</button>
                    </div>
                </div>
            </div>
            <div id="notes-area" class="p-3"></div>
        </div>
    </div>
    <div class="modal fade" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <input id="fill-title-edit" class="d-block w-100 border-0 ps-4 pe-4 edit-content" type="text" name="title" placeholder="Judul">
                    <textarea id="fill-content-edit" class="d-block w-100 border-0 ps-4 pe-4 pb-1 edit-content" name="content" placeholder="Buat catatan..."></textarea>
                    <div id="footer-modal" class="d-flex justify-content-end">
                        <button type="button" id="btn-delete" class="btn btn-danger">Delete</button>
                        <button type="button" id="btn-close-update" class="btn btn-sm">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    @vite(['resources/js/Notes/initialize.js'])
</body>
</html>