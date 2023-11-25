<?php

namespace App\Http\Controllers;

use App\Models\Session;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    //     function sessionstart(Request $request){
    //         //return $request;
    //        $session=new Session();
    //         $session->rid=$request->input('id');
    //         $session->email=$request->input('email');
    //         $session->cookie='';
    //         $session->save();
    //         return 'session saved ';
    //    }
    function sessionend(Request $request)
    {
        $token = $request->input('token');
        Session::where('cookie', $token)->delete();

        return 'session ended';
    }
  
}
