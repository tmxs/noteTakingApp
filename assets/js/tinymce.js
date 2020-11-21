import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';

import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/anchor';

const editorHeight = window.innerHeight - 250;

tinymce.init({
    selector: 'textarea',
    height: editorHeight,
    plugins: "anchor lists table code link textpattern preview",
    menubar: 'file edit view format tools',
    toolbar: 'preview link lists image | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | table',
});
