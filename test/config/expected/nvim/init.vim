": vim-plug
call plug#begin()
" LANGUAGE, COMPLETION AND LINT
Plug 'w0rp/ale'
Plug 'roxma/nvim-completion-manager'
Plug 'autozimu/LanguageClient-neovim', { 'do': ':UpdateRemotePlugins' }
Plug 'roxma/ncm-flow'
Plug 'roxma/ncm-elm-oracle'
Plug 'roxma/nvim-cm-tern',  {'do': 'npm install'}
Plug 'calebeby/ncm-css'
Plug 'roxma/LanguageServer-php-neovim',  {'do': 'composer install && composer run-script parse-stubs'}
Plug 'Shougo/neco-vim'
Plug 'fatih/vim-go'
Plug 'flowtype/vim-flow'
Plug 'ternjs/tern_for_vim', {'do':'npm install '}
Plug 'mhartington/nvim-typescript'
Plug 'rust-lang/rust.vim'
Plug 'racer-rust/vim-racer'
Plug 'nsf/gocode'
Plug 'rhysd/github-complete.vim'
" SYNTAX
Plug 'sheerun/vim-polyglot'
" THEMES
Plug 'robertmeta/nofrils'
Plug 'cideM/vim' " dracula fork
Plug 'cideM/nofrils-noctu'
Plug 'drewtempelmeyer/palenight.vim'
Plug 'junegunn/seoul256.vim'
Plug 'morhetz/gruvbox'
" UI and EDITOR
Plug 'easymotion/vim-easymotion'
Plug 'Chiel92/vim-autoformat'
Plug 'ludovicchabant/vim-gutentags'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'junegunn/goyo.vim'
Plug 'junegunn/vim-peekaboo'
Plug 'junegunn/limelight.vim'
Plug 'junegunn/vim-easy-align'
Plug 'junegunn/gv.vim'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-unimpaired'
Plug 'tpope/vim-commentary'
Plug 'wincent/ferret'
Plug 'jreybert/vimagit'
Plug 'mhinz/vim-sayonara'
" Plug 'itchyny/lightline.vim'
call plug#end()

" ================ General ====================
set termguicolors
set cursorline
set number                      "Line numbers are good
set showmode                    "Show current mode down the bottom

" else file watcher like webpack only work on quit
set noswapfile

set foldmethod=syntax
set foldlevel=5

" hide current file when opening new one, instead of closing #BufferLife
set hidden

set splitbelow
set splitright

" Make vim use system clipboard by default
set clipboard=unnamedplus

" supposed to suppress some error messages
set shortmess+=c

" completion including nvim completion manager
set completeopt+=longest,menuone,preview

" let g:SuperTabDefaultCompletionType = "<c-n>"

" ================ PLUGINS ====================
let g:flow#omnifunc = 0
let g:flow#showquickfix = 0

let g:racer_cmd = "~/.cargo/bin/racer"
let g:racer_experimental_completer = 1

let g:EasyMotion_do_mapping = 0 " Disable default mappings

let g:cm_refresh_length = [[1, 5], [7, 5]]

" ALE
let g:ale_echo_msg_format       = '%linter% says %s'
let g:ale_sign_error            = 'x'
let g:ale_sign_warning          = 'o'
let g:ale_javascript_flow_extra = 1
let g:ale_sign_column_always    = 1

" Customize fzf colors to match your color scheme
let g:fzf_colors =
\ { 'fg':      ['fg', 'Normal'],
  \ 'bg':      ['bg', 'Normal'],
  \ 'hl':      ['fg', 'Comment'],
  \ 'fg+':     ['fg', 'Function', 'CursorColumn', 'Normal'],
  \ 'bg+':     ['bg', 'Normal', 'Normal'],
  \ 'hl+':     ['fg', 'Function'],
  \ 'info':    ['fg', 'Function'],
  \ 'prompt':  ['fg', 'Normal'],
  \ 'pointer': ['fg', 'Function'],
  \ 'marker':  ['fg', 'Keyword'],
  \ 'spinner': ['fg', 'Function'],
  \ 'header':  ['fg', 'Comment'] }

" ================ Indentation ======================
set shiftwidth=2
set softtabstop=2
set tabstop=2
set expandtab
set autoindent
set smartindent
set wrap

" Display tabs and trailing spaces visually
set list listchars=tab:\ \ ,trail:·

" ================ Search ===========================
set ignorecase      " Ignore case when searching...
set smartcase       " ...unless we type a capital

" ================= CUSTOM COMMANDS =========
let mapleader = " "

nnoremap <leader>an :ALENextWrap<cr>
nnoremap <leader>ap :ALEPreviousWrap<cr>
nnoremap <leader>f  :Files<cr>
nnoremap <leader>e  :20Lex<cr>
nnoremap <leader>h  :noh<cr>
nnoremap <leader>b  :Buffers<cr>
nnoremap <leader>d  :call LanguageClient_textDocument_definition()<cr>
nnoremap <leader>i  :call LanguageClient_textDocument_hover()<cr>
nnoremap <leader>r  :call LanguageClient_textDocument_rename()<cr>
nnoremap <leader><leader>f :Autoformat<cr>
nnoremap <leader><leader>c :cclose<cr>
nnoremap <leader><leader>l :lclose<cr>
nnoremap <leader><leader>s :w !sudo tee %<cr>
nnoremap <leader><leader>m :Magit<cr>
" preview tag
nnoremap <leader><leader>p <C-W>}<cr> 
nnoremap <leader><leader>z <C-W>z<cr>

nnoremap <BS> <C-^>

" Jump to anywhere you want with minimal keystrokes, with just one key binding.
" `s{char}{label}`
nmap s <Plug>(easymotion-overwin-f)
" or
" `s{char}{char}{label}`
" Need one more keystroke, but on average, it may be more comfortable.
nmap s <Plug>(easymotion-overwin-f2)

nmap <leader>s <Plug>(FerretAckWord)

" Start interactive EasyAlign in visual mode (e.g. vipga)
xmap ga <Plug>(EasyAlign)

" Start interactive EasyAlign for a motion/text object (e.g. gaip)
nmap ga <Plug>(EasyAlign)

inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

imap <expr> <CR>  (pumvisible() ?  "\<c-y>\<Plug>(expand_or_nl)" : "\<CR>")
imap <expr> <Plug>(expand_or_nl) (cm#completed_is_snippet() ? "\<C-U>":"\<CR>")

" ================ Statusline ==============
set statusline=\ 
set statusline+=%{matchstr(fugitive#statusline(),'(\\zs.*\\ze)')}
set statusline+=\ 
set statusline+=%F
set statusline+=\ 
set statusline+=%m
set statusline+=\ 
set statusline+=%R
set statusline+=%=
set statusline+=\ 
set statusline+=%Y
set statusline+=\ 
set statusline+=%q
set statusline+=\ 
set statusline+=%p%%
set statusline+=\ 

" ================ Colors ==============
set background=dark
let g:seoul256_srgb = 1
let g:seoul256_background = 236
let g:nofrils_strbackgrounds=1
colorscheme foo
