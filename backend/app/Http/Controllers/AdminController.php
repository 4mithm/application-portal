<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Models\Register;
use App\Models\Studentinfo;
use Illuminate\Support\Facades\DB;
use App\Models\Notify;
use App\Models\NotifyAll;
use App\Models\Support;
use App\Models\Course;
use App\Models\Session;


class AdminController extends Controller
{
    function adminsessioncheck(Request $request)
    {
        
        $token = $request->input('token');
        $res = Session::where('cookie', $token)->where('email', 'admin')->get();
        if (count($res))
            return ['status' => 'login'];
        else
            return ['status' => 'logout'];
    }
    function getall()
    {

        $res = Register::all();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function delreg(Request $request)
    {
        $id = $request->input('id');

        $res = DB::delete('delete from registers where rid=' . $id);
        if ($res)
            return ['status' => 'deleted'];
        else
            return  ['status' => 'error'];
    }
    function getAllApplication()
    {
        // $res = Studentinfo::all();
        // return json_encode($res);
        $res =  DB::table('registers')->join('applications', 'registers.rid', '=', 'applications.rid')->select('registers.rid', 'registers.firstname', 'registers.email', 'applications.course', 'applications.status', 'applications.aid')->get();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function accept(Request $request)
    {
        $id = $request->input('id');
        $course = $request->input('course');
        // $res = DB::update("update applications set status='accepted' where rid=" . $id);
        $res = Studentinfo::where('rid', $id)->update(['status' => 'accepted', 'course' => $course]);

        if ($res) return ['status' => 'accepted'];
    }
    function reject(Request $request)
    {
        $id = $request->input('id');
        $res = DB::update("update applications set status='rejected' where rid=" . $id);
        if ($res) return  ['status' => 'rejected'];
    }
    function rejected()
    {
        $res = DB::table('registers')->join('applications', 'registers.rid', '=', 'applications.rid')->select('registers.rid', 'registers.firstname', 'registers.email', 'applications.course', 'applications.status', 'applications.aid')->where('status', 'rejected')->get();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function accepted()
    {
        $res = DB::table('registers')->join('applications', 'registers.rid', '=', 'applications.rid')->select('registers.rid', 'registers.firstname', 'registers.email', 'applications.course', 'applications.status', 'applications.aid')->where('status', 'accepted')->get();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function notify(Request $request)
    {
        //return $request->input();
        // return ['status'=>'saved'];
        if ($request->input('id') == 'All') {
            $notifyall = new NotifyAll();
            $notifyall->message = $request->input('message');
            $notifyall->save();
            return ['status' => 'saved'];
        } else {
            $ids = explode(',', $request->input('id'));

            foreach ($ids as $id) {
                $notifysome = new Notify();
                $notifysome->rid = $id;
                $notifysome->message = $request->input('message');
                $notifysome->save();
            }
            return ['status' => 'saved'];
        }
        return null;
    }
    function getallnotify()
    {
        $specific = Notify::all();
        $all = NotifyAll::all();
        if (!count($specific) && !count($all))
            return ['status' => 'nodata'];
        return ['specific' => $specific, 'all' => $all];
    }
    function dataToModal(Request $request)
    {

        $id = $request->input('id');

        $res = DB::table('registers')->join('applications', 'registers.rid', '=', 'applications.rid')->select('registers.rid', 'registers.firstname', 'registers.lastname', 'registers.email', 'applications.*')->where('registers.rid', $id)->get();
        if (count($res)) return json_encode(['rid' => $res]);
        else return json_encode([['rid' => null]]);
    }
    function getallfeedback()
    {
        $res = Feedback::all();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function getallsupport()
    {
        $res = Support::all();
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function updatesupport(Request $request)
    {
        $res = Support::where('id', $request->input('id'))->update(['response' => $request->input('response')]);
        if ($res)
            return Support::all();
    }
    function search(Request $request)
    {

        // return $request->input();
        $statement = "select  * from applications where ";
        if ($request->has('rid')) {
            $id = $request->input('rid');

            $statement .= "rid=" . $id;
            $statement .= ' and ';
        }
        if ($request->has('aid')) {
            $aid = $request->input('aid');

            $statement .= "aid= 'BCKAPPid-" . $aid . "'";
            $statement .= ' and ';
        }
        if ($request->has('course')) {
            $course = $request->input('course');
            // select * from applications where course like '%BCA%'

            $statement .= 'course like ' . "'%" . $course . "%'";
            $statement .= 'and ';
        }
        if ($request->has('gender')) {
            $gender = $request->input('gender');

            $statement .= 'gender=' . "'" . $gender . "'";
            $statement .= 'and ';
        }
        if ($request->has('pumark')) {
            $pumark = $request->input('pumark');

            $statement .= 'pumark>=' . $pumark;
            $statement .= ' and ';
        }
        $statement .= 1;

        // return $statement;
        // return DB::select("select * from applications where course='BCA'and gender='male'and 1=1");
        // "select * from applications where rid=100023 and 1"
        $x =  $statement;
        //return $x;
        $res = DB::select($x);
        if (count($res)) return json_encode($res);
        else return json_encode([['rid' => null]]);
    }
    function addcourse(Request $request)
    {
        $co = new Course();
        $co->course = $request->input('course');
        $co->description = $request->input('descip');
        $co->save();
        return 'saved';
    }
    function getcoursewithinfo()
    {
        $res = Course::all();
        if (count($res))
            return $res;
        else
            return [['id' => '']];
    }
    function delcourse(Request $request)
    {
        $id = $request->input('id');
        $res = Course::where('id', $id)->delete();
        if ($res)
            return 'deleted';
    }
    function adminhome(Request $request)
    {
        $registered = Register::count();
        $pending = Studentinfo::where('status', 'pending')->count();
        $accepted = Studentinfo::where('status', 'accepted')->count();
        $applications = Studentinfo::count();
        $rejected = Studentinfo::where('status', 'rejected')->count();
      $firstarr= ['Total Applications Accepted' => $accepted, 'Total Applications Rejected' => $rejected, 'Registrations' => $registered, 'Applications' => $applications, 'Pending' => $pending];
        $x= Course::all('course');
        $all=[];
        

        $cnt=[];
       foreach($x as $z)
       array_push($all,$z->course);
       foreach($all as $course){
        $cnt[$course." Accepted"]=Studentinfo::where('status', 'accepted')->where('course',$course)->count();
       }
       $final=array_merge($firstarr,$cnt);
       return $final;

      
       
      

    }
    function delfromnotifyall(Request $request)
    {
        $id = $request->input('id');
        $res = NotifyAll::where('id', $id)->delete();
        if ($res)
            return 'deleted';
    }
    function delfromnotifyone(Request $request)
    {
        $id = $request->input('id');
        $res = Notify::where('id', $id)->delete();
        if ($res)
            return 'deleted';
    }
}
