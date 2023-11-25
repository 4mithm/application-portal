<?php

namespace App\Http\Controllers;

use App\Models\Register;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Session;


class RegisterController extends Controller
{

    function register(Request $request)
    {
        if ($request->input('email') == 'admin')
            return json_encode(['status' => 'exists']);
        $user = new Register();
        $res = DB::table('registers')->first();
        if (empty($res)) {

            $user->rid = 100000;
            $user->firstname = $request->input('firstname');
            $user->lastname = $request->input('lastname');

            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->save();
            return json_encode(['status' => 'saved']);

        } else {

            $res = DB::table('registers')
                ->where('email', $request->input('email'))
                ->get();
            if (count($res)) {
                return json_encode(['status' => 'exists']);
            } else {
                $user->firstname = $request->input('firstname');
                $user->lastname = $request->input('lastname');
                $user->email = $request->input('email');
                $user->password = Hash::make($request->input('password'));
                $user->save();
                return json_encode(['status' => 'saved']);
            }
        }
    }
    function login(Request $request)
    {
        //return json_encode($request->header());
        $email = $request->input('email');
        $password = $request->input('password');
        //return [$email,$password];
        if ($email == 'admin' && $password == '123')
        {
            $token = sha1(mt_rand(1, 90000) . 'SALT');
            
            $session=new Session();
            $session->rid=-1;
            $session->email='admin';
            $session->cookie=$token;
            $session->save();
            return ['status' => 'admin','token' => $token];
        }
        $res = DB::table('registers')->where('email', $email)->first();
      
        if (!empty($res)) {
            if (Hash::check($password, $res->password)) {
                $token = sha1(mt_rand(1, 90000) . 'SALT');
             
                $session=new Session();
                $session->rid=$res->rid;
                $session->email=$res->email;
                $session->cookie=$token;
                $session->save();
                

                return response(['status' => 'student', 'info' => $res, 'token' => $token]);
            } else {
                return ['status' => 'passerror'];
            }
        } else
            return ['status' => 'notfound'];
    }
}
