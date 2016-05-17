

...course on angular JS services in Depth ---from Pluralsight

creating services, working with common built in services...
networking, cookies, caching and logging...

scaffold a new application with the resource service..


service decorations, modify or add new functionality...

working with booklogger app,,,log which books they read...how long they read...

various options to create services...
why you should choose one over the other...


5 different ways....providers versus services...
basics of providers...also need to understand dependency annotations....for minification purposes...to make JS code remain intact...

they also exposed on the module obj..

provider() = configurable provider object....to create a service....3 of the remaining 4 functions call the provider internally..

factory - wrapper around provider...primary service creation functiin...

service()  = wrapper around factory function.....it will internally call the factory fn and then call the provider function..

value() thin wrapper around factory fn ...
constant() --- value and constant fundamentally different...

constant() does not call factory or provider....own unique kind of service...


$provide --- one of the services that ships with angular........
once register -- the injector 
provide service creates a provider...that contains a fn to creates a service...

$provide.provider() fundamental way to create a service.....
call the fn and pass it a name....


$provide.provider('books', fn(){
	$this.get()   == need this get() fn
})

name for the service , with the word provider appended to it...
name of the service is books...
name of the provider is booksProvider...

Provider must define a $get function..


benefits of provider --- ability to configure underlying provider for the service....

---------------------------reading again----------

5 different ways to create services -- 
Providers vs services --  
Dependency annotations -- passing a service as a parameter to the controller, also apply the annotation code to make it intact for minification..

1)All 5 fns are called on the built in $provide service , also exposed on the module object..

1) provider ...knows to create the service -- 3 of 4 call this provider..
2)factory - wrapper -- around provider...
3) service - wrapper around factory..
4) value - wrapper around factory...
5) constant --- value and constant look similar...constant one in the list different from rest,., it does nto call factory or provider...


services are designed to be injected in other components...$provide ..ships with angular...
$provide.provider()

$provide.provider('books', function(){
		this.$get = function(){   --//very imp -- function assigned to this property will be called by angular
		var appName = "nigga";
		return {
			appName:appName
		};
	};
})

benefit is ability to config the underlying provider for this service...main advantage using provider...(other 4 cannot do this)

provider is low  level  --- it is configurable during the module configuration phase...


allow some configuration now...
----factory----
if you dont need to configure the underlying provider obnject...

---service...
calls factory which calls provider..
treats function it is passed as  a constructor...
executes constructor fn with new operator..
you would need service instead of factory - if you specifically needed your function to be trated as a contructor and called with a new oeprator...

if you have defined an inheritance hieraracy in your code...createing an instance with new -  makes sure your instantiated obj properly inherited from its prototypes...


---for factory just create on .factory  and inject that name to our controller and make factory return some shit/..

---changed service to factory -- gettting 
angular.js:13550 Error: [$injector:undef] Provider 'logger' must return a value from $get factory method.

----value and constant services---

value services --- shorthand for factory with no parameters -- 

if you dont need to inject anuthiong into factory function you could use value instead... 
cannot be injected into a module configuration function 
////the other can be injected anywhere..
can be overriden by an angularJS decorator...


	constant ---  weird shit... simply registers service with injector, no factory/provider calls.... 
	can be injected into a module configuration function 
	-- cannot be overriden by an angularJS decorator..

also know decorators - modfify or override behavior of existing service..



--constant - can be injected into module's config function 

Angular value and constant services are an ideal way to provide application wide access to shared data without having to pollute the global namespace. They can be injected similar to any other service into our controllers and services. The only real difference between a value and a constant is that the latter can be injected into  a module configuration function while the former cannot.


A constant can be injected anywhere.

A constant can not be intercepted by a decorator, that means that the value of a constant should never be changed.

var app = angular.module('app', []);

app.constant('PI', 3.14159265359);

app.controller('appCtrl', function(PI) {
    var radius = 4;
    // calculate area of the circle
    var area = PI * radius * radius; 
});
Value differs from constant in that value can not be injected into configurations, but it can be intercepted by decorators.

var app = angular.module('app', []);

app.value('greeting', 'Hello');

app.config(function ($provide) {
    $provide.decorator('greeting', function ($delegate) {
        return $delegate + ' World!';
    });
});


-----dpenedency annotatin..
///inform injector what services to inject..
use to support minification...
three thechniques available...
 - implicityly from function parameter names..
 - use $inject property annotation..
 - using inline array annotation...pass in array of strings...with last parameter as the function...

using $inject 
	dataService.$inject = ['logger'];


-----------common built in services...----

promises and $q service...
$cookies, $cookieStore and $log 

promise  $q service is often refeered as promise library..
in JS , promises are objects whcih represent the pending result of an async operation...



$q service - provides an API for promises, also API for deferred objects that return promises to the calling code and signal them with results when async operation is complete...


client - initiate async call to service 
Use promise API to configuyre callback functions..

then client can execute callback functions...


Service - create deferred object 
2 return promise to client immediately. .


perform work ..
when the work is complete, finish successfully... use defererd api to signal client with results. 


--------------------------
I believe since the promise library is based on Q implementation, as soon as the first promise gets rejected, the reject callback is called with the error. It does not wait for other promises to resolved. 



------------------routing behavior single page app 

$routeProvider to configure mapping of controllers and views to URLs 

$route watches the URL and directs browser to the correct route..
$routeParams to capture URL parameters...


$route and $routeProvider configuration..

angular.module('ngRoute',['ng']).provider('$route', $RouteProvider)

only services created with provider fn are configureable with module's config function ..routeService is configured with provider fn --

$RouteProvider into the config function in order to configure the route...

app,cofig(routeProvider)

$routeProvider.when () .when().otherwise()

$routeParams --- 

.when('/Editbook/:bookID')


have to inject the $routeParams service into our controller...

var myparam = $routeParams.bookID ;

if you want 2 parameters ---  .when('/Editbook/:bookID/:para2')


1) var app = angular.module('app',['ngRoute']); ngRoute is the name of the module...


2 ) $routeProvider
		.when('/',{
			templateUrl :'/app/templates/books.html',
			controller : 'BooksController',
			controllerAs :'books'
		})



<a href="#/addBook">Add New Books!</a>  - linking to new route...

//angular config expects client side routes begin with # symbol

-------resolve property - very useful 

will let you specify list of deependecenies injecteing into the controller when changing the route...
most of the time it will be a promise (the dependency) the router will wait for the promise to be resolved before continuing the route. 

resolve: {  - we can wait for the data to be available before we seeing the new view...
	books: function (dataService){
		return dataService.getAllBooks();
	}
}
learn more about this ...

inject books property into the controller...

$route Events -- events fired when using the route service... 
all the route changes broadcast on $rootScope. 

Inject $rootScope to define event handlers..
use $rootScope.$on to specify event types to listen for...

4 events. 
routeChangeStarts....routeChangeSuccess.. routeChangeError -- routeUpdate 

----------$cookies and $cookieStore...

cookies conveniet way to store small bit of data on the client..

available in the ngCookies module...

to store string value...

$cookies to read/write simple  strings... as properties on the service..

Use $cookieStore for storing object... 

it serirallizes and derializes to and from json ... get(key), put(key, value), remove(key)

dont use cookies by means of sharing data amout the controller...better way to solve that problem using custom services...

$log --- log() info() warn() error() debug()

you can configure whether or not calls to debug() will be shown in the console using the $logProvider...during production disable debug calls...in one stop ...

logProvider ---  can be made considerablymore interesting using decorators...

---cookies demo -- 
i want to aadd new features to app , able to specify a particular book as the favorite book , so it can be displayed on the homepage...also store the recently edited book...

store both of them in cookies...

---lets see how to make config change in the log service.... to configure services we inject the associated provider in the module's config function..

-------------------networking services....server over http ... using built in framework... built in http and resource services...

in http, transformations and interceptors...  and then $resource service..

$http service -- 200 OK...
Function as a service... pass it a configuration object... returns a promise with two additional methodsd (success and error)

$http configuration object... 
1) method -- http method ... get post, put delete..
2) url - absolute or relative url 
3) params - key value pair 
4) data - body of http request 
5) headers..
6) cache - propery is a boolean value specifies whether or not angular should cache the request ..true request will be cached in default http cache...

Response object -- it returns a promise ..  parameter passed to the then functions on the http promise..contains following properties...

data - boddy of response..(raw JSON)
status  - 200 OK, 404 not found 
statusText - corresponding HTTP status message
headers - http response headers - it is a fn - pass to it optional header name

config - contains the config object that was passed to the $http service..when the request was made... (good)


REST FUL web services -- 

representational state transfer... arch pattern..
Web API or HTTP Api - call this instead..

uses HTTP verbs to specify CRUD operations... 
URL conventions adddress individual aas well as collection of resources..

we will do rest crud on booklogger...

POST - if successful, returns HTTP 201 created..

read  0 GET returns HTTP 200..... get api/books or api/books/5

update - PUT  if successful, returns HTTp 204 no content...
Delecte - if successful, returns HTTP 204 NO content..


GET should be used to retrieve a resource. This operation should be idempotent, meaning it should not change any state on the server.

POST should be used to add new information to the server. This is usually performed on a URL that represents a "container" of resources. The POST will add a new resource to this container.

PUT should be used to update an existing resource.

DELETE should be obvious.

Run this code in a console or from anywhere (CORS and JSONP supported).







































































