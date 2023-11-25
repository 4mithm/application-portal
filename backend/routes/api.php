<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\StudentInfoController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!  
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//api to control register ....
Route::post('register', [RegisterController::class, 'register']);
//api to control login 
Route::post('login', [RegisterController::class, 'login']);

//Route::post('sessioncheck',[RegisterController::class,'sessioncheck']);
// Route::post('sessionstart', [SessionController::class, 'sessionstart']);
Route::post('sessionend', [SessionController::class, 'sessionend']);

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
Route::group(['middleware' => 'adminprotect'], function () {
    //api to get all the registered student to the admin 
    Route::post('getall', [AdminController::class, 'getall']);
    //api to delete registerd student by the admin 
    Route::post('delreg', [AdminController::class, 'delreg']);
    Route::post('getAllApplication', [AdminController::class, 'getAllApplication']);
    //to accept the student form ..
    Route::post('accept', [AdminController::class, 'accept']);
    //to reject the student form ...
    Route::post('reject', [AdminController::class, 'reject']);
    //get all accepted form ...
    Route::post('accepted', [AdminController::class, 'accepted']);
    //get all accpeted form ...
    Route::post('rejected', [AdminController::class, 'rejected']);
    //save the notifications send from student 
    Route::post('notify', [AdminController::class, 'notify']);
    ///get all the notifications sent by admin 
    Route::post('getallnotify', [AdminController::class, 'getallnotify']);
    //get all feedback  send from student to admin ..
    Route::post('getallfeedback', [AdminController::class, 'getallfeedback']);
    //posting data to the pop up modal in the admin view 
    Route::post('datatomodal', [AdminController::class, 'dataToModal']);
    //get all data from supports table 
    Route::post('getallsupport ', [AdminController::class, 'getallsupport']);
    //response sent by the admin to the request
    Route::post('updatesupport ', [AdminController::class, 'updatesupport']);
    //filtering the applications in admin 
    Route::post('search ', [AdminController::class, 'search']);
    //add course by admin 
    Route::post('addcourse ', [AdminController::class, 'addcourse']);

    //deleting  the course by the admin 
    Route::post('delcourse', [AdminController::class, 'delcourse']);

    Route::post('adminhome ', [AdminController::class, 'adminhome']);

    Route::post('delfromnotifyone ', [AdminController::class, 'delfromnotifyone']);

    Route::post('delfromnotifyall ', [AdminController::class, 'delfromnotifyall']);
});

Route::post('adminsessioncheck ', [AdminController::class, 'adminsessioncheck']);
Route::post('studsessioncheck ', [StudentInfoController::class, 'studsessioncheck']);



//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
Route::group(['middleware' => 'studentprotect'], function () {
    //************************************************************************ */
    //get all course with information for admin and student 
    Route::post('getcoursewithinfo ', [AdminController::class, 'getcoursewithinfo']);
    //***************************************************************** */
    //get only course name ...............
    Route::post('onlycoursename', [StudentInfoController::class, 'onlycoursename']);
    //get  all notifications to student                                         
    Route::post('notifications', [StudentInfoController::class, 'notifications']);
    //saving the feedback sent from the student ..
    Route::post('feedback', [StudentInfoController::class, 'feedback']);
    //checking if feedback is written or not 
    Route::post('feedbackcheck', [StudentInfoController::class, 'feedbackcheck']);
    //get all support data related to paticular student 
    Route::post('supportwid ', [StudentInfoController::class, 'supportwid']);
    //send request by student 
    Route::post('sendrequest ', [StudentInfoController::class, 'sendrequesttosupport']);
    //edit the filled application form 
    Route::post('editapplication ', [StudentInfoController::class, 'editApplication']);

    //------------------------------------------------------

    Route::post('getname', [StudentInfoController::class, 'getname']);

    Route::post('setname', [StudentInfoController::class, 'setname']);

    Route::post('changepassword', [StudentInfoController::class, 'changepassword']);

    //api to save the studnet info to table 
    Route::post('application', [StudentInfoController::class, 'application']);
    Route::post('formcheck', [StudentInfoController::class, 'formChecker']);
    //to check the status of the student form if its pending, accepted,rejected...
    Route::post('statuscheck', [StudentInfoController::class, 'statuscheck']);
});



///my test apil..................
Route::post('mycookcheck', [SessionController::class, 'mycookcheck']);
