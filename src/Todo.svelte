<script>
  import { TODO } from "./store";
  export let d = [];
  $: todo = $TODO;
  let busy = false;
  let del = i => {
    if (!busy) {
      let newTodo = todo.filter(todo => todo.id != i);
      TODO.set([...newTodo]);
    }
  };
  const edit = e => {
    // console.log(e.target.offsetParent.children[2]);
    const up = e.target.offsetParent.children[2];
    const txt = e.target.offsetParent.children[1];
    up.classList.toggle("hidden");
    txt.classList.toggle("hidden");
    busy = !busy;
  };
  const ok = e => {
    const up = e.target.offsetParent;
    const txt = e.target.offsetParent.previousElementSibling;
    up.classList.toggle("hidden");
    txt.classList.toggle("hidden");
    busy = !busy;
  };
  const update = i => {
    let newTodo = { ...todo[i - 1], title: "Bangladesh", completed: true };
    const updatedTodo = [...todo.slice(0, i - 1), newTodo, ...todo.slice(i)];
    TODO.set([...updatedTodo]);
  };
</script>

<style>
  .hidden {
    display: none;
  }
  .busy {
    color: rgba(165, 165, 165, 0.5);
  }
  .notification {
    padding: 0.5rem;
    margin-bottom: 0.8rem;
  }
  .middle {
    vertical-align: -webkit-baseline-middle;
  }
  .checked {
    text-decoration: line-through;
    color: #ff3939;
  }
  input {
    width: 80%;
  }
  .control {
    margin-left: 45px;
    margin-top: -15px;
  }
</style>

<div class="notification">
  <div class="switch">
    <input type="checkbox" id="{'switch' + d.id}" class="switch__input"
    bind:checked="{d.completed}" disabled={busy?'disabled':''} />
    <label for="{'switch' + d.id}" class="switch__label"> </label>
  </div>
  <span class="middle {d.completed?'checked':''}">{d.title}</span>
  <div class="control hidden update">
    <input type="text" bind:value="{d.title}" class="input is-small" />
    <button class="button is-small" on:click="{(e)=>ok(e)}">OK</button>
  </div>
  <button class="edit del" on:click="{()=>del(d.id)}"></button>
  <button class="edit pen" on:click="{(e)=>edit(e)}"></button>
</div>
