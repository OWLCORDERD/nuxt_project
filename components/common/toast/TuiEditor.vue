<template>
    <div ref="editor"/>
</template>
<script setup>
    const editor = ref();

    const props = defineProps(["defaultOptions"]);

    onMounted(() => {
        if(editor.value) {
            editor.value = toastEditorInstance(
            editor.value,
            "wysiwyg",
            props.defaultOptions,
            "500px",
            props.initialValue
        )
        }
    })
</script>
<style lang="scss">
    
</style>