<style lang="less">
    @import '../../../styles/common.less';
    @import 'markdown-editor.less';
</style>

<template>
    <div>
        <i-row class="margin-top-20">
            <i-col span="16" offset="4">
                <div class="markdown-con">
                    <i-card>
                        <textarea id="iview_admin_markdown_editor" style="display:none;"></textarea>
                    </i-card>
                </div>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import './simplemde.min.css'

  export default {
    name: 'markdown-editor',
    mounted () {
      new SimpleMDE({
        element: document.getElementById('iview_admin_markdown_editor'),
        toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
      })
    }
  }
</script>
