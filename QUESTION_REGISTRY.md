# Gradstudio question registry — semantic de-duplication

> For AI authors: inspect this registry **and** the existing completed modules before drafting. A new question is a duplicate if its expected answer and reasoning are substantially the same—even when wording, topic labels, examples, or question order differ. See [the detailed standard](STUDY_MODULE_BUILD_STANDARD.md).

**Status:** Current published bank for ranks 001–005. Legacy modules may contain overlapping fundamentals; do not silently rewrite their questions. Block new repeats going forward.

| Rank | Question | Exact assessed question (verbatim) | Module |
|---:|---:|---|---|
| 001 | 1 | What does the word “large” describe in large language models, and is there a universal parameter count that defines an LLM? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 2 | Why can doubling an LLM's parameter count fail to deliver a matching improvement in useful performance? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 3 | Why can serving an LLM to many users require more memory even though the model weights do not change? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 4 | What can perplexity tell you about a causal language model, and why should it not replace task-level evaluation? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 5 | A developer wants an LLM to fit in limited GPU memory. What is the main trade-off of reducing weight precision? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 6 | How could biased patterns in training data affect an LLM's answers, even when its output sounds fluent? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 7 | An LLM scores well on general tests but struggles with specialist maintenance reports. What should developers investigate? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 001 | 8 | You must deploy an LLM for confidential internal documents. How would you choose between a local model and a hosted service? | [HTML](Large-Language-Models-LLMs-Keyword-Study-008.html) |
| 002 | 1 | What does Generative Pre-trained Transformer (GPT) mean, and what makes it a type of large language model? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 2 | What does GPT learn during pre-training, and why can it use that learning for many different text tasks? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 3 | How does GPT generate a response one token at a time after receiving a prompt? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 4 | How does the Transformer’s attention mechanism help GPT use earlier words when predicting what comes next? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 5 | What is GPT’s context window, and why does it matter when a user supplies a long document? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 6 | Why might a GPT model need instruction tuning before it works well as a helpful chat assistant? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 7 | GPT confidently states an old refund policy, but the company updated it yesterday. Why can this happen, and how should an application respond? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 002 | 8 | In an interview, you are asked to build a GPT-powered customer-support assistant that answers questions using changing company documents. How would you design it for accuracy, speed, cost, and safety? | [HTML](GPT-LLM-Foundation-Keyword-Study-008.html) |
| 003 | 1 | What is the Transformer architecture, and which idea makes it different from older sequence models? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 2 | Why can Transformers process training sequences more efficiently than basic recurrent language models? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 3 | How do token embeddings and positional information prepare text before Transformer layers process it? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 4 | What does self-attention help a Transformer represent when words depend on other words in a sentence? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 5 | How would an encoder–decoder Transformer help translate a sentence from English into French? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 6 | Why does a GPT-style decoder use a causal attention mask during text generation? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 7 | A model confuses 'bank' in 'river bank' with a financial bank. Which Transformer features could help? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 003 | 8 | You are designing translation, document classification, and chat features. How would you choose Transformer configurations and explain the trade-offs? | [HTML](Transformer-Architecture-Keyword-Study-008.html) |
| 004 | 1 | What does generative artificial intelligence (GenAI) do, and how is it different from a model that classifies information? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 2 | Why can a GenAI model create different outputs from similar prompts instead of copying one stored answer? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 3 | What happens when a user sends a prompt to a trained GenAI model to generate content? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 4 | How do a prompt, training data, and model parameters play different roles in GenAI output? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 5 | How could a marketing team use GenAI to draft an advertisement without losing control of its brand information? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 6 | Why should teams check GenAI outputs for hallucinations, privacy risks, and misleading media? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 7 | A model creates a beautiful product image, but the packaging label is wrong. What should the team do? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 004 | 8 | You are asked to launch a GenAI assistant that creates customer emails and marketing images. How would you balance quality, safety, speed, and cost? | [HTML](Generative-AI-GenAI-Keyword-Study-008.html) |
| 005 | 1 | What does autoregressive language modeling mean when generating a sentence? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 2 | Why is token order important in an autoregressive language model? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 3 | How does an autoregressive model turn a prompt into a longer answer during inference? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 4 | During next-token training, how are the input tokens and target tokens related? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 5 | What does a causal attention mask do in a GPT-style autoregressive model? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 6 | How can temperature or sampling change the output of an autoregressive model without changing its trained weights? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 7 | An autoregressive model starts a customer reply with the wrong product name. Why might the later response also drift? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |
| 005 | 8 | You are building a streaming autoregressive chat service. How would you balance generation speed, coherence, and operating cost? | [HTML](Autoregressive-Language-Modeling-Keyword-Study-008.html) |

## New module review procedure

Before building, write a private audit table: proposed question → unique learning objective → nearest similar question in this registry → substantive difference. If the question merely rephrases an existing objective, replace it with an untested competency. Append verified new questions here after committing the standalone HTML.
