# LLM Foundations — ranked keyword module index

> **Canonical curriculum index.** Follow the PDF's original rank order exactly. The PDF is the source for the keyword, topic, tier, and rank; this index tracks module completion and offers separate links to the **running browser preview** and the **GitHub source code**. Read [AGENTS.md](AGENTS.md), [STUDY_MODULE_BUILD_STANDARD.md](docs/STUDY_MODULE_BUILD_STANDARD.md), and [QUESTION_REGISTRY.md](QUESTION_REGISTRY.md) before generating the next keyword.

**Ranked PDF (identical source file):** [Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf](references/Build_a_Large_Language_Model_Kept_Ranked_Technical_Terms.pdf)

**Source inventory:** 265 ranked keywords, 54 Essential, 105 High, 91 Specialized, 15 Peripheral. Ranking is editorial guidance from the PDF, not an order supplied by the textbook itself.

**Progress:** 15 / 265 completed. **Next unbuilt rank:** 016 — Context length.

## Rules for future builds

1. Follow rank 001 → 265; use the earliest **pending** rank unless the user names a different rank or keyword. The user's explicitly requested keyword takes priority.
2. Check the matching PDF row for its exact **Keyword**, **Topic**, **Importance**, and **Rank**. Preserve that spelling and domain in the module.
3. Read every existing question in [QUESTION_REGISTRY.md](QUESTION_REGISTRY.md) and perform a **semantic no-repetition audit**; rephrasing a past question does not make it new.
4. Build an independent eight-MCQ monolithic HTML file under `lessons/<topic>/`, following the approved Multimodal-style template. Do not overwrite unrelated lessons or the homepage.
5. After verification, add BOTH links for each Complete row: a **Browser preview** using GitHub Pages (`https://sabareeshrao.github.io/Gradstudio-Version-2.0/<filename>.html`) and **View HTML source** using the correct repository-relative `lessons/<topic>/<filename>.html` path. Never label a GitHub blob/source view as a browser preview. Check preview availability and report if deployment is not independently verified. Append the new questions/competencies to the question registry.
6. Never reorder, renumber, merge, drop, or fill in a ranked keyword from memory. The PDF stays authoritative. If the source PDF changes, reconcile the entire table explicitly.

## Complete ranked inventory

| Rank | Technical keyword | Topic | Importance | Status | Browser preview | HTML source |
|---:|---|---|---|---|---|---|
| 001 | Large language models (LLMs) | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Large-Language-Models-LLMs-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 002 | Generative Pre-trained Transformer (GPT) | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/GPT-LLM-Foundation-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/GPT-LLM-Foundation-Keyword-Study-008.html) |
| 003 | Transformer architecture | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Transformer-Architecture-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Transformer-Architecture-Keyword-Study-008.html) |
| 004 | Generative artificial intelligence (GenAI) | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Generative-AI-GenAI-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Generative-AI-GenAI-Keyword-Study-008.html) |
| 005 | Autoregressive language modeling | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Autoregressive-Language-Modeling-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 006 | Pretraining | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Pretraining-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Pretraining-Keyword-Study-008.html) |
| 007 | Fine-tuning | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Fine-tuning-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Fine-tuning-Keyword-Study-008.html) |
| 008 | Foundation models | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Foundation-models-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Foundation-models-Keyword-Study-008.html) |
| 009 | Language model training objectives | LLM Foundations | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Language-model-training-objectives-Keyword-Study-008.html) | [View HTML source](lessons/llm-foundations/Language-model-training-objectives-Keyword-Study-008.html) |
| 010 | Tokenization | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Tokenization-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Tokenization-Keyword-Study-008.html) |
| 011 | Byte pair encoding (BPE) | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Rank-011-Byte-Pair-Encoding-BPE-Keyword-Study-008.html) |
| 012 | Token IDs | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-012-Token-IDs-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Rank-012-Token-IDs-Keyword-Study-008.html) |
| 013 | Token embeddings | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-013-Token-Embeddings-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Rank-013-Token-Embeddings-Keyword-Study-008.html) |
| 014 | Word embeddings | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-014-Word-Embeddings-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Rank-014-Word-Embeddings-Keyword-Study-008.html) |
| 015 | Positional embeddings | Text Processing | Essential | Complete | [Preview in browser](https://sabareeshrao.github.io/Gradstudio-Version-2.0/Rank-015-Positional-Embeddings-Keyword-Study-008.html) | [View HTML source](lessons/text-processing/Rank-015-Positional-Embeddings-Keyword-Study-008.html) |
| 016 | Context length | Text Processing | Essential | Pending | — | — |
| 017 | Special context tokens | Text Processing | Essential | Pending | — | — |
| 018 | Attention mechanisms | Transformer Attention | Essential | Pending | — | — |
| 019 | Self-attention | Transformer Attention | Essential | Pending | — | — |
| 020 | Causal attention | Transformer Attention | Essential | Pending | — | — |
| 021 | Multi-head attention | Transformer Attention | Essential | Pending | — | — |
| 022 | Attention scores | Transformer Attention | Essential | Pending | — | — |
| 023 | Attention weights | Transformer Attention | Essential | Pending | — | — |
| 024 | Context vectors | Transformer Attention | Essential | Pending | — | — |
| 025 | Causal attention masks | Transformer Attention | Essential | Pending | — | — |
| 026 | Scaled dot-product attention | Transformer Attention | Essential | Pending | — | — |
| 027 | Transformer blocks | Model Architecture | Essential | Pending | — | — |
| 028 | Feedforward neural networks | Model Architecture | Essential | Pending | — | — |
| 029 | Layer normalization | Model Architecture | Essential | Pending | — | — |
| 030 | Shortcut / residual connections | Model Architecture | Essential | Pending | — | — |
| 031 | Linear / fully connected layers | Model Architecture | Essential | Pending | — | — |
| 032 | Activation functions | Model Architecture | Essential | Pending | — | — |
| 033 | Softmax | Model Architecture | Essential | Pending | — | — |
| 034 | Tensors | Training & Evaluation | Essential | Pending | — | — |
| 035 | Automatic differentiation (autograd) | Training & Evaluation | Essential | Pending | — | — |
| 036 | Backpropagation | Training & Evaluation | Essential | Pending | — | — |
| 037 | Gradients | Training & Evaluation | Essential | Pending | — | — |
| 038 | Loss functions | Training & Evaluation | Essential | Pending | — | — |
| 039 | Cross-entropy loss | Training & Evaluation | Essential | Pending | — | — |
| 040 | Training loops | Training & Evaluation | Essential | Pending | — | — |
| 041 | Training and validation losses | Training & Evaluation | Essential | Pending | — | — |
| 042 | Optimization algorithms | Training & Evaluation | Essential | Pending | — | — |
| 043 | Learning rate | Training & Evaluation | Essential | Pending | — | — |
| 044 | Text generation | Text Generation | Essential | Pending | — | — |
| 045 | Decoding strategies | Text Generation | Essential | Pending | — | — |
| 046 | Greedy decoding | Text Generation | Essential | Pending | — | — |
| 047 | Temperature scaling | Text Generation | Essential | Pending | — | — |
| 048 | Top-k sampling | Text Generation | Essential | Pending | — | — |
| 049 | Instruction fine-tuning | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 050 | Supervised fine-tuning | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 051 | Classification fine-tuning | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 052 | Parameter-efficient fine-tuning (PEFT) | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 053 | Low-rank adaptation (LoRA) | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 054 | Preference fine-tuning | Fine-tuning & Adaptation | Essential | Pending | — | — |
| 055 | Artificial intelligence (AI) | LLM Foundations | High | Pending | — | — |
| 056 | Machine learning | LLM Foundations | High | Pending | — | — |
| 057 | Deep learning | LLM Foundations | High | Pending | — | — |
| 058 | Supervised learning | LLM Foundations | High | Pending | — | — |
| 059 | Unlabeled data pretraining | LLM Foundations | High | Pending | — | — |
| 060 | Emergent behavior | LLM Foundations | High | Pending | — | — |
| 061 | Large-scale pretraining datasets | LLM Foundations | High | Pending | — | — |
| 062 | Model architecture implementation | LLM Foundations | High | Pending | — | — |
| 063 | Model parameters | LLM Foundations | High | Pending | — | — |
| 064 | Model weights | LLM Foundations | High | Pending | — | — |
| 065 | Pretrained weights | LLM Foundations | High | Pending | — | — |
| 066 | Vocabulary size | Text Processing | High | Pending | — | — |
| 067 | Token embedding matrices | Text Processing | High | Pending | — | — |
| 068 | Embedding dimension | Text Processing | High | Pending | — | — |
| 069 | Sliding-window sampling | Text Processing | High | Pending | — | — |
| 070 | Input/output token sequences | Text Processing | High | Pending | — | — |
| 071 | Instruction-response pairs | Text Processing | High | Pending | — | — |
| 072 | Prompt formatting | Text Processing | High | Pending | — | — |
| 073 | Text completion | Text Processing | High | Pending | — | — |
| 074 | Encoding and decoding tokens | Text Processing | High | Pending | — | — |
| 075 | Raw text preprocessing | Text Processing | High | Pending | — | — |
| 076 | Query, key and value matrices | Transformer Attention | High | Pending | — | — |
| 077 | Dot products | Transformer Attention | High | Pending | — | — |
| 078 | Trainable attention weights | Transformer Attention | High | Pending | — | — |
| 079 | Multi-head weight splitting | Transformer Attention | High | Pending | — | — |
| 080 | Stacking single-head attention layers | Transformer Attention | High | Pending | — | — |
| 081 | Preventing information leakage | Transformer Attention | High | Pending | — | — |
| 082 | Long-sequence modeling | Transformer Attention | High | Pending | — | — |
| 083 | Single-head attention | Transformer Attention | High | Pending | — | — |
| 084 | Number of attention heads | Transformer Attention | High | Pending | — | — |
| 085 | GELU activation | Model Architecture | High | Pending | — | — |
| 086 | ReLU activation | Model Architecture | High | Pending | — | — |
| 087 | SwiGLU activation | Model Architecture | High | Pending | — | — |
| 088 | Dropout regularization | Model Architecture | High | Pending | — | — |
| 089 | Pre-LayerNorm | Model Architecture | High | Pending | — | — |
| 090 | Post-LayerNorm | Model Architecture | High | Pending | — | — |
| 091 | RMSNorm | Model Architecture | High | Pending | — | — |
| 092 | Embedding layer | Model Architecture | High | Pending | — | — |
| 093 | Output / classification heads | Model Architecture | High | Pending | — | — |
| 094 | Forward pass | Model Architecture | High | Pending | — | — |
| 095 | Linear layer weights | Model Architecture | High | Pending | — | — |
| 096 | Multilayer neural networks | Model Architecture | High | Pending | — | — |
| 097 | Computation graphs | Training & Evaluation | High | Pending | — | — |
| 098 | Partial derivatives | Training & Evaluation | High | Pending | — | — |
| 099 | Scalar, vector and matrix operations | Training & Evaluation | High | Pending | — | — |
| 100 | Matrix multiplication | Training & Evaluation | High | Pending | — | — |
| 101 | Tensor data types | Training & Evaluation | High | Pending | — | — |
| 102 | Tensor shapes and dimensions | Training & Evaluation | High | Pending | — | — |
| 103 | Data loaders | Training & Evaluation | High | Pending | — | — |
| 104 | Datasets and dataset classes | Training & Evaluation | High | Pending | — | — |
| 105 | Training batches | Training & Evaluation | High | Pending | — | — |
| 106 | Stochastic gradient descent (SGD) | Training & Evaluation | High | Pending | — | — |
| 107 | AdamW optimizer | Training & Evaluation | High | Pending | — | — |
| 108 | Learning rate warmup | Training & Evaluation | High | Pending | — | — |
| 109 | Cosine learning-rate decay | Training & Evaluation | High | Pending | — | — |
| 110 | Gradient clipping | Training & Evaluation | High | Pending | — | — |
| 111 | Weight decay | Training & Evaluation | High | Pending | — | — |
| 112 | Model evaluation | Training & Evaluation | High | Pending | — | — |
| 113 | Accuracy metric | Training & Evaluation | High | Pending | — | — |
| 114 | Perplexity | Training & Evaluation | High | Pending | — | — |
| 115 | Model checkpointing | Training & Evaluation | High | Pending | — | — |
| 116 | Training / evaluation modes | Training & Evaluation | High | Pending | — | — |
| 117 | Sampling from model logits | Text Generation | High | Pending | — | — |
| 118 | Multinomial sampling | Text Generation | High | Pending | — | — |
| 119 | Randomness control in decoding | Text Generation | High | Pending | — | — |
| 120 | Model text-generation functions | Text Generation | High | Pending | — | — |
| 121 | Sequence length constraints | Text Generation | High | Pending | — | — |
| 122 | Instruction datasets | Fine-tuning & Adaptation | High | Pending | — | — |
| 123 | Instruction-following models | Fine-tuning & Adaptation | High | Pending | — | — |
| 124 | Classification heads | Fine-tuning & Adaptation | High | Pending | — | — |
| 125 | Supervised classification loss | Fine-tuning & Adaptation | High | Pending | — | — |
| 126 | Spam classification with LLMs | Fine-tuning & Adaptation | High | Pending | — | — |
| 127 | Instruction-data preparation | Fine-tuning & Adaptation | High | Pending | — | — |
| 128 | Instruction-batch collation | Fine-tuning & Adaptation | High | Pending | — | — |
| 129 | Fine-tuned response evaluation | Fine-tuning & Adaptation | High | Pending | — | — |
| 130 | Low-rank scaling factor | Fine-tuning & Adaptation | High | Pending | — | — |
| 131 | LoRA adapted linear layers | Fine-tuning & Adaptation | High | Pending | — | — |
| 132 | Loading pretrained LLMs | Fine-tuning & Adaptation | High | Pending | — | — |
| 133 | Pretrained weight initialization | Fine-tuning & Adaptation | High | Pending | — | — |
| 134 | GPU-accelerated training | Performance & Distributed Training | High | Pending | — | — |
| 135 | Single-GPU training | Performance & Distributed Training | High | Pending | — | — |
| 136 | Multi-GPU training | Performance & Distributed Training | High | Pending | — | — |
| 137 | DistributedDataParallel (DDP) | Performance & Distributed Training | High | Pending | — | — |
| 138 | Distributed data sampling | Performance & Distributed Training | High | Pending | — | — |
| 139 | GPU device selection | Performance & Distributed Training | High | Pending | — | — |
| 140 | Computations on GPUs | Performance & Distributed Training | High | Pending | — | — |
| 141 | Gradient accumulation and updates | Performance & Distributed Training | High | Pending | — | — |
| 142 | Gradient norm | Performance & Distributed Training | High | Pending | — | — |
| 143 | PyTorch | Python & PyTorch | High | Pending | — | — |
| 144 | Automatic gradient tracking | Python & PyTorch | High | Pending | — | — |
| 145 | PyTorch Dataset abstraction | Python & PyTorch | High | Pending | — | — |
| 146 | PyTorch DataLoader abstraction | Python & PyTorch | High | Pending | — | — |
| 147 | PyTorch nn.Module abstraction | Python & PyTorch | High | Pending | — | — |
| 148 | PyTorch Linear layer | Python & PyTorch | High | Pending | — | — |
| 149 | Tensor operations | Python & PyTorch | High | Pending | — | — |
| 150 | State dictionaries | Python & PyTorch | High | Pending | — | — |
| 151 | Torch no-gradient context | Python & PyTorch | High | Pending | — | — |
| 152 | PyTorch model saving and loading | Python & PyTorch | High | Pending | — | — |
| 153 | PyTorch tensor creation | Python & PyTorch | High | Pending | — | — |
| 154 | PyTorch random seeds | Python & PyTorch | High | Pending | — | — |
| 155 | Base model | LLM Foundations | High | Pending | — | — |
| 156 | Neural networks | LLM Foundations | High | Pending | — | — |
| 157 | Encoder and decoder architectures | Model Architecture | High | Pending | — | — |
| 158 | Feedforward layer | Model Architecture | High | Pending | — | — |
| 159 | Tokenizers | Text Processing | High | Pending | — | — |
| 160 | BERT | Language Models & Tools | Specialized | Pending | — | — |
| 161 | GPT-2 | Language Models & Tools | Specialized | Pending | — | — |
| 162 | GPT-3 | Language Models & Tools | Specialized | Pending | — | — |
| 163 | GPT-4 | Language Models & Tools | Specialized | Pending | — | — |
| 164 | Llama 2 | Language Models & Tools | Specialized | Pending | — | — |
| 165 | Llama 3 | Language Models & Tools | Specialized | Pending | — | — |
| 166 | Phi-3 | Language Models & Tools | Specialized | Pending | — | — |
| 167 | OLMo | Language Models & Tools | Specialized | Pending | — | — |
| 168 | Recurrent neural networks (RNNs) | Language Models & Tools | Specialized | Pending | — | — |
| 169 | Bahdanau attention | Language Models & Tools | Specialized | Pending | — | — |
| 170 | Word2Vec | Language Models & Tools | Specialized | Pending | — | — |
| 171 | Retrieval-augmented generation (RAG) | Language Models & Tools | Specialized | Pending | — | — |
| 172 | Ollama | Language Models & Tools | Specialized | Pending | — | — |
| 173 | llama.cpp | Language Models & Tools | Specialized | Pending | — | — |
| 174 | LitGPT | Language Models & Tools | Specialized | Pending | — | — |
| 175 | Axolotl | Language Models & Tools | Specialized | Pending | — | — |
| 176 | tiktoken | Language Models & Tools | Specialized | Pending | — | — |
| 177 | Google Colab | Language Models & Tools | Specialized | Pending | — | — |
| 178 | Python package installer (pip) | Language Models & Tools | Specialized | Pending | — | — |
| 179 | Alpaca dataset | Language Models & Tools | Specialized | Pending | — | — |
| 180 | FineWeb dataset | Language Models & Tools | Specialized | Pending | — | — |
| 181 | LIMA dataset | Language Models & Tools | Specialized | Pending | — | — |
| 182 | UltraChat dataset | Language Models & Tools | Specialized | Pending | — | — |
| 183 | Dolma corpus | Language Models & Tools | Specialized | Pending | — | — |
| 184 | Tensor scalar (0D) | Python & PyTorch | Specialized | Pending | — | — |
| 185 | Tensor vector (1D) | Python & PyTorch | Specialized | Pending | — | — |
| 186 | Two-dimensional tensors | Python & PyTorch | Specialized | Pending | — | — |
| 187 | Three-dimensional tensors | Python & PyTorch | Specialized | Pending | — | — |
| 188 | Tensor indexing and reshaping | Python & PyTorch | Specialized | Pending | — | — |
| 189 | Tensor transposition | Python & PyTorch | Specialized | Pending | — | — |
| 190 | Tensor casting and device transfer | Python & PyTorch | Specialized | Pending | — | — |
| 191 | Model parameter inspection | Python & PyTorch | Specialized | Pending | — | — |
| 192 | PyTorch training step | Python & PyTorch | Specialized | Pending | — | — |
| 193 | PyTorch zero_grad | Python & PyTorch | Specialized | Pending | — | — |
| 194 | Sampling API torch.argmax | Python & PyTorch | Specialized | Pending | — | — |
| 195 | NumPy-like array API | Python & PyTorch | Specialized | Pending | — | — |
| 196 | Tensor shapes | Python & PyTorch | Specialized | Pending | — | — |
| 197 | Batch normalization | Training & Evaluation | Specialized | Pending | — | — |
| 198 | Model initialization | Training & Evaluation | Specialized | Pending | — | — |
| 199 | Batch size | Training & Evaluation | Specialized | Pending | — | — |
| 200 | Target tensors | Training & Evaluation | Specialized | Pending | — | — |
| 201 | Dataset train/test splits | Training & Evaluation | Specialized | Pending | — | — |
| 202 | Test-set evaluation | Training & Evaluation | Specialized | Pending | — | — |
| 203 | Weight initialization from pretraining | Training & Evaluation | Specialized | Pending | — | — |
| 204 | Training step visualization | Training & Evaluation | Specialized | Pending | — | — |
| 205 | Learning-rate schedule peak | Training & Evaluation | Specialized | Pending | — | — |
| 206 | DataLoader batching boundaries | Training & Evaluation | Specialized | Pending | — | — |
| 207 | Training ratio | Training & Evaluation | Specialized | Pending | — | — |
| 208 | Model output logits | Training & Evaluation | Specialized | Pending | — | — |
| 209 | Neural network parameters | Training & Evaluation | Specialized | Pending | — | — |
| 210 | LoRA parameterization | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 211 | LoRA layer replacement | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 212 | Direct preference optimization (DPO) example folder | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 213 | Instruction prompt templates | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 214 | Instruction dataset collation | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 215 | Instruction response extraction | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 216 | Classification accuracy evaluation | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 217 | PyTorch multi-process spawning | Performance & Distributed Training | Specialized | Pending | — | — |
| 218 | Distributed process-group initialization | Performance & Distributed Training | Specialized | Pending | — | — |
| 219 | Distributed process-group destruction | Performance & Distributed Training | Specialized | Pending | — | — |
| 220 | CUDA device visibility | Performance & Distributed Training | Specialized | Pending | — | — |
| 221 | Apple MPS device | Performance & Distributed Training | Specialized | Pending | — | — |
| 222 | Distributed sampler rank | Performance & Distributed Training | Specialized | Pending | — | — |
| 223 | Progress monitoring | Performance & Distributed Training | Specialized | Pending | — | — |
| 224 | PyTorch multiprocessing | Performance & Distributed Training | Specialized | Pending | — | — |
| 225 | Start-of-sequence token [BOS] | Text Processing | Specialized | Pending | — | — |
| 226 | End-of-sequence token [EOS] | Text Processing | Specialized | Pending | — | — |
| 227 | Padding token [PAD] | Text Processing | Specialized | Pending | — | — |
| 228 | End-of-text token | Text Processing | Specialized | Pending | — | — |
| 229 | Unknown token | Text Processing | Specialized | Pending | — | — |
| 230 | Sequence padding and truncation | Text Processing | Specialized | Pending | — | — |
| 231 | Tokenizer configuration | Text Processing | Specialized | Pending | — | — |
| 232 | Text sequence stride | Text Processing | Specialized | Pending | — | — |
| 233 | QKV projection bias | Text Processing | Specialized | Pending | — | — |
| 234 | Context length parameterization | Text Processing | Specialized | Pending | — | — |
| 235 | Attention weight projections | Transformer Attention | Specialized | Pending | — | — |
| 236 | Attention head dimensions | Transformer Attention | Specialized | Pending | — | — |
| 237 | Causal mask triangular construction | Transformer Attention | Specialized | Pending | — | — |
| 238 | Attention output projection | Transformer Attention | Specialized | Pending | — | — |
| 239 | Single-head attention implementation | Transformer Attention | Specialized | Pending | — | — |
| 240 | Causal-attention implementation | Transformer Attention | Specialized | Pending | — | — |
| 241 | Multi-head attention implementation | Transformer Attention | Specialized | Pending | — | — |
| 242 | GELU feedforward implementation | Model Architecture | Specialized | Pending | — | — |
| 243 | GPT model implementation | Model Architecture | Specialized | Pending | — | — |
| 244 | Transformer block implementation | Model Architecture | Specialized | Pending | — | — |
| 245 | LayerNorm module | Model Architecture | Specialized | Pending | — | — |
| 246 | RMSNorm alternative | Model Architecture | Specialized | Pending | — | — |
| 247 | Sampling argmax | Text Generation | Specialized | Pending | — | — |
| 248 | Model response generation | Text Generation | Specialized | Pending | — | — |
| 249 | Logistic regression loss | Training & Evaluation | Specialized | Pending | — | — |
| 250 | Conversational performance | Fine-tuning & Adaptation | Specialized | Pending | — | — |
| 251 | PHUDGE model | Language Models & Tools | Peripheral | Pending | — | — |
| 252 | Prometheus model | Language Models & Tools | Peripheral | Pending | — | — |
| 253 | Python regular expressions | Language Models & Tools | Peripheral | Pending | — | — |
| 254 | Python DataFrame | Language Models & Tools | Peripheral | Pending | — | — |
| 255 | Python code timing | Language Models & Tools | Peripheral | Pending | — | — |
| 256 | PyTorch audio library | Language Models & Tools | Peripheral | Pending | — | — |
| 257 | PyTorch vision library | Language Models & Tools | Peripheral | Pending | — | — |
| 258 | Python version | Language Models & Tools | Peripheral | Pending | — | — |
| 259 | macOS | Language Models & Tools | Peripheral | Pending | — | — |
| 260 | Math equality operator | Language Models & Tools | Peripheral | Pending | — | — |
| 261 | Python matrix multiply operator | Language Models & Tools | Peripheral | Pending | — | — |
| 262 | Tensor flattening / element count | Language Models & Tools | Peripheral | Pending | — | — |
| 263 | Python functools library | Language Models & Tools | Peripheral | Pending | — | — |
| 264 | PyTorch Sequential module | Language Models & Tools | Peripheral | Pending | — | — |
| 265 | Pretrained model parameter counts | Language Models & Tools | Peripheral | Pending | — | — |

---

**Preview vs source:** **Preview in browser** is the GitHub Pages address where the interactive lesson should render; **View HTML source** opens the complete file on GitHub (code view). Pages previews are subject to deployment and were not browser-verified in this update. If the preview is unavailable, download the raw `.html` file and open it in a browser. Do not mark previews as verified without checking them.

**Repository organization:** Source files now live in `lessons/llm-foundations/`, `lessons/text-processing/`, or `lessons/api-design/`. Pages publishing retains the historical flat preview URLs with full HTML copies. New modules must be added inside topic folders, with updated links here and in `QUESTION_REGISTRY.md`.

**Maintenance note:** This list is rank-ordered, not grouped alphabetically. Only a verified, committed HTML file should be labeled Complete. A missing lesson remains Pending even if its questions have been drafted. Always preserve source PDF and update this index and the question registry together.