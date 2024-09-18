<template>
        <common-toast-TuiEditor :defaultOptions="defaultOptions"/>
</template>
<script setup>
    const defaultOptions = {
        toolbarItems: [
            ['Headings', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent']
        ]
    }
</script>
<style lang="scss">
</style>