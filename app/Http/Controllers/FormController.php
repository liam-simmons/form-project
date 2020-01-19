<?php

namespace App\Http\Controllers;

use App\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
  public function store()
  {

    $data = request()->validate([
      'firstName' => 'required',
      'surname' => 'required',
      'email' => 'required|email',
      'phone' => 'required|regex:/[0-9]{11}/', //maybe edit this?
      'gender' => 'required|in:Male,Female,Other',
      'dob' => 'required|date',
      'comment' => ''
    ]);

    $form = Form::create($data);

    return $form;
  }
}
