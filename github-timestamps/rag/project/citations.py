import re

CITATION_PATTERN = re.compile(r"\[([^\[\]\r\n]+:[0-9]+)\]")


def extract_citations(answer: str) -> list[str]:
    return list(dict.fromkeys(CITATION_PATTERN.findall(answer)))


def validate_citations(
    answer: str, results: list[dict[str, str | float]]
) -> tuple[list[dict[str, str | float]], list[str]]:
    retrieved = {result["id"]: result for result in results}
    valid = []
    unknown = []

    for citation_id in extract_citations(answer):
        if citation_id in retrieved:
            valid.append(retrieved[citation_id])
        else:
            unknown.append(citation_id)

    return valid, unknown


def display_citations(answer: str, results: list[dict[str, str | float]]) -> None:
    valid, unknown = validate_citations(answer, results)
    if not valid and not unknown:
        print("\nNo chunk citations found; answer is not source-linked.")
        return

    if valid:
        print("\nCited sources (ID match only):")
        for source in valid:
            print(f"[{source['id']}] {source['source']}")
            print(source["text"])
    if unknown:
        print("\nWarning: unknown citation IDs:", ", ".join(unknown))
    print("Citation ID matches do not prove factual support.")
