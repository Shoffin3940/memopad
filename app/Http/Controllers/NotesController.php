<?php

namespace App\Http\Controllers;
use App\Models\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::latest('updated_at')->get();
            return response()->json($notes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        $note = Note::create([
            'title'=> $request->title,
            'content'=>$request->content,
        ]); 

        return response()->json($note,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        $request->validate([
            'title' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        $note = Note::find($id);
        $note->update([
            'title'=>$request->title,
            'content'=>$request->content,
        ]);
        return response()->json($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $note = Note::find($id);
        $note->delete();
        return response()->json($note);
    }
}
