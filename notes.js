

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








































