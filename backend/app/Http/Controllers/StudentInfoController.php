<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Session;
use App\Models\Studentinfo;
use App\Models\Feedback;
use App\Models\NotifyAll;
use App\Models\Support;
use App\Models\Notify;
use App\Models\Register;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;

function getvalue($x){
     
 $y=Session::all()->where('cookie',$x)->first();
 return $y->rid;
    
    
}


class StudentInfoController extends Controller
{

    function studsessioncheck(Request $request)
    {
        
        $token = $request->input('token');
        $res = Session::where('cookie', $token)->get();
        if (count($res))
            return ['status' => 'login'];
        else
            return ['status' => 'logout'];
    }
    function formChecker(Request $request)
    {
      
        $token= $request->input('token');
        $rid= getValue($token);
   
        $appid = '';
      
        $res = DB::table('applications')
            ->where('rid', $rid)
            ->get();

        if (count($res)) {
            $res = DB::table('registers')->join('applications', 'registers.rid', '=', 'applications.rid')->select('registers.rid', 'registers.firstname', 'registers.lastname', 'registers.email', 'applications.*')->where('registers.rid', $rid)->get();
            return ['status' => 'filled', 'res' => $res];
        } else {
            $reg = DB::table('registers')
                ->where('rid', $rid)
                ->get();
            $app = Studentinfo::all()->last();
            if (!$app)
                $appid = 'BCKAPPid-101';
            else {
                $s1 = $app->aid;
                list($part1, $part2) = explode('-', $s1);
                $x = 1 + (int) $part2;
                $appid = 'BCKAPPid-' . (string)$x;
            }

            return ['status' => 'notfilled', 'res' => $reg, 'aid' => $appid];
        }
    }
    function  application(Request $req)
    {
        $token= $req->input('token');
        $rid= getValue($token);
        $studinfo = new Studentinfo();

        $studinfo->rid = $rid;
        $studinfo->course = $req->input('course');
        $studinfo->aid = $req->input('aid');
        $studinfo->fathername = $req->input('fathername');
        $studinfo->gender = $req->input('gender');
        $date = $req->input('dob');
        $studinfo->dob = date('Y-m-d', strtotime($date));

        $studinfo->phone = $req->input('phone');
        $studinfo->pumark = $req->input('pumark');
        $studinfo->address = $req->input('address');
        $studinfo->photo = ltrim($req->file('photo')->store('public'), 'public/');
        $studinfo->pumarkscard = ltrim($req->file('pumarkscard')->store('public'), 'public/');
        $studinfo->status = 'pending';


        $studinfo->save();
        return ['status' => 'infosaved'];
    }
    function editApplication(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);

        if ($request->has('photo')) {

            $file = Studentinfo::select('photo')->where('rid', $rid)->get();
            $str="storage/". $file[0]['photo'];
            File::delete($str);

            $photo = ltrim($request->file('photo')->store('public'), 'public/');
            $res = Studentinfo::where('rid', $rid)->update(['photo' => $photo]);
            if ($res)
                return 'saved';
            else
                return 'notsaved';
        }
        //-----------------------------------------------------------------------------
        if ($request->has('pumarkscard')) {
            $file = Studentinfo::select('pumarkscard')->where('rid', $rid)->get();
            $str1="storage/" . $file[0]['pumarkscard'];
            File::delete($str1);
            $pumarkscard = ltrim($request->file('pumarkscard')->store('public'), 'public/');
            $res = Studentinfo::where('rid', $rid)->update(['pumarkscard' => $pumarkscard]);
            if ($res)
                return 'saved';
            else
                return 'notsaved';
        }
        //---------------------------------------------------------------------------------------------------
        $fathername = $request->input('fathername');
        $dob = $request->input('dob');
        $course = $request->input('course');
        $pumark = $request->input('pumark');
        $address = $request->input('address');
        $phone = $request->input('phone');
        $gender = $request->input('gender');
        $arr = ['fathername' => $fathername, 'dob' => $dob, 'course' => $course, 'pumark' => $pumark, 'address' => $address, 'gender' => $gender, 'phone' => $phone];
        $res = Studentinfo::where('rid', $rid)->update($arr);
        if ($res)
            return 'saved';
        else
            return 'notsaved';
    }
    function statuscheck(Request $request)
    {

        $token= $request->input('token');
        $rid= getValue($token);
        $res = Studentinfo::select('status','course')->where('rid', $rid)->get();
        //return json_decode($res["status"]);
        //return $res;

        if (count($res))
            return  ['result' => $res[0]['status'],'course' => $res[0]['course']];
        else
            return ['result' => 'notfilled'];
    }
    function notifications(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);

        $specific = Notify::select()->where('rid', $rid)->get();
        $all = NotifyAll::all();
        if (!count($specific) && !count($all))
            return ['status' => 'nodata'];
        return ['specific' => $specific, 'all' => $all];
    }
    function feedback(Request $req)
    {

        $token= $req->input('token');
        $rid= getValue($token);
        $feed = new Feedback();
        $feed->rid = $rid;
        $feed->rating = $req->input('rating');
        $feed->feedback = $req->input('feedback');
        $feed->save();
    }
    function feedbackcheck(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);

        $res = Feedback::all()->where('rid', $rid);
        // $res = DB::table('feedbacks')
        //     ->where('rid', $info['id'])
        //     ->get();

        if (count($res))
            return ['status' => true];
        else
            return ['status' => false];
    }
    function supportwid(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);
        $res = DB::table('supports')
            ->where('rid', $rid)
            ->get();

        $res = json_decode($res);
        //I had some problem with this $res ....
        if (!count($res))
            return ['result' => 'empty'];

        return ['result' => $res];
    }
    function sendrequesttosupport(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);
        $sup = new Support();
        $sup->rid = $rid;
        $sup->request = $request->input('request');
        $sup->save();


        $res = DB::table('supports')
            ->where('rid', $rid)
            ->get();

        $res = json_decode($res);

        if (!count($res))
            return ['result' => 'empty'];

        return ['result' => $res];
    }
    function onlycoursename()
    {
        $res = Course::get(['course']);
        if (count($res))
            return $res;
        else
            return [['course' => null]];
    }
    function getname(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);

        $res = Register::all()->where('rid', $rid)->last();

        return ['result' => $res];
    }
    function setname(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);
        $rid = $rid;
        $firstname = $request->input('firstname');
        $lastname = $request->input('lastname');

        $ary = ['firstname' => $firstname, 'lastname' => $lastname];

        $res = Register::where('rid', $rid)->update($ary);
        if ($res)
            return ['status' => 'infosaved'];
    }
    function changepassword(Request $request)
    {
        $token= $request->input('token');
        $rid= getValue($token);
        $rid = $rid;
        $password = Hash::make($request->input('password'));
        $ary = ['password' => $password];
        $res = Register::where('rid', $rid)->update($ary);
        if ($res)
            return ['status' => 'infosaved'];
    }
}
