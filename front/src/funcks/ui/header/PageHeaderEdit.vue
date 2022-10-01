<template>
    <div class="t-c py pb_x2">
       <div class="fx-s" :class="cis">
            <div class="w-30"></div>
             <h2 class="thd w-40">
                {{ header }}
            </h2>
            <div class="w-30">
                <slot></slot>
            </div>
       </div>
    </div>
</template>

<script>
    export default { props: [ 'header', 'cis' ] }
</script>