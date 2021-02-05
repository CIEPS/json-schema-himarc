<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur et voluptates eius consequuntur quos tempore aut eum fugiat est ullam, ducimus vitae repellat. Ipsam eos veniam minus repellat, tempore illo!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>