modules:are user to group  componets not standalone componets they are the part of module . we can lazy loading modules in application


lazy loading in the angular :loading the content of webpages whenever it requiee .it used to reduce the initial loading time

-generate module in the angular with routing  features  : ng g m module_name --routing


-create file routing.module.ts-used to set up path/route of the componets inside the module
-create file module.ts=used to import common packages needed for componets inside the modules
-generate componets inside a module :ng g c module_name/componet_name --no--standalone


-lazy load a  module in angular :define lazy load steps inside app.routes.ts(root routing)file
use the following command 

-set up lazy loaded path for module shoudld be the file path in app.route.ts file

{
    path:"module_path" ,loadChildren:()=>import('module_path').then(m=>m.module_name)
}