import CategoryTabs from "@/app/components/categories/CategoryTabs";



export default function CategoriesPage(){


return (

<main className="space-y-6">


<h1 className="
text-2xl
font-bold
text-slate-800
">

Categories

</h1>


<p className="text-slate-500">

Manage service categories and team designations.

</p>


<CategoryTabs/>


</main>

)

}