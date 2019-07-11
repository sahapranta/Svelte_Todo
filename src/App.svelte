<script>
  import { onMount } from 'svelte';
  import Navbar from "./Navbar.svelte";
  import Todo from "./Todo.svelte";
  import {TODO} from "./store";
  $: todos = $TODO;
  let filter ;
  let show = true;
  let todo = '';

  const add = ()=>{
		if(todo.length >2){
			TODO.set([{id:todos.length+1, title:todo, completed:false, userId:todos.length+1 }, ...todos]);
			todo = '';
		}
  }

  const toggle =(t)=>{
		show = false;
		filter = t=='true'? true:false;
  }
  onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`);
		let result = await res.json();
		TODO.set([...result]);
	});
</script>
<style>
  .title{
	  text-align: center;
	  padding: 5px;
  }
	
  .message-body{
		border:none;
	}
  .input{
	  width:87%;
  }
  @media only screen and (max-width: 600px) {
		.input{width:67%;}
	}
</style>
<Navbar />
<div class="columns">
  <div class="column is-2"></div>

  <div class="column is-8">
	  <h1 class="title">Todo App</h1>
    <div class="message is-success">
			<div class="message-body">
					<div class="field">
							<div class="control">
								<input class="input" type="text" bind:value={todo} placeholder="Type your TODO...">
								<input class="button is-link" type="button" value="Add New" on:click={add}>
							</div>
					</div>
					<div class="container">
						Filter: 
						<button class="button is-light  is-small" on:click={()=>show = true} >All</button>
						<button class="button is-info  is-small" on:click={()=>toggle('false')} >Active</button>
						<button class="button is-danger is-small" on:click={()=>toggle('true')} >Completed</button>
					</div>
			<br>
				<div class="content">
					{#each todos as d}
						{#if show}
							<Todo d={d}/>
						{:else if d.completed === filter}
							<Todo d={d}/>
						{/if}
					{:else}
						<h4 class="has-text-center">No tasks today!</h4>
					{/each}
				</div>
			</div>
		</div>
		
    <div class="column is-2"></div>
  </div>
</div>
