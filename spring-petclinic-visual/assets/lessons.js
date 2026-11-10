window.PETCLINIC_DATA = {
  "001": {
    "n": "001",
    "title": "Before the first line of Java",
    "strap": "A project begins with its README, not with a running application.",
    "sha": "349fdef18bcf688709f19097c140c69724905768",
    "meta": "Root commit · 1 new file",
    "date": "Git author date: January 9, 2013",
    "source": "https://github.com/spring-projects/spring-petclinic/commit/349fdef18bcf688709f19097c140c69724905768",
    "sections": [
      {
        "type": "compare",
        "title": "One file changes everything",
        "intro": "The exact first commit adds only README.md. No application code exists in this snapshot.",
        "before": {
          "title": "Before this root commit",
          "files": [
            "No tracked files yet"
          ],
          "caption": "There is no earlier ancestor commit."
        },
        "after": {
          "title": "After this commit",
          "files": [
            "README.md"
          ],
          "caption": "A project identity now exists in Git history."
        }
      },
      {
        "type": "document",
        "title": "See the four-line README",
        "intro": "This is the original content, not an invented sample.",
        "filename": "README.md",
        "lines": [
          "spring-petclinic",
          "================",
          "",
          "sample application for the Spring framework"
        ],
        "notes": [
          {
            "line": "1",
            "title": "Give the project a name",
            "body": "The repository introduces itself as spring-petclinic."
          },
          {
            "line": "2",
            "title": "Make a Markdown heading",
            "body": "Equals signs below text make an old-style top-level heading."
          },
          {
            "line": "4",
            "title": "Explain the purpose",
            "body": "This is a sample application for learning the Spring framework."
          }
        ]
      },
      {
        "type": "flow",
        "title": "How Git creates the first checkpoint",
        "intro": "A commit is a recorded snapshot of files, not necessarily a working feature.",
        "items": [
          {
            "icon": "✦",
            "title": "An idea",
            "sub": "Spring sample project",
            "tone": "blue"
          },
          {
            "icon": "▤",
            "title": "README.md",
            "sub": "Name + description",
            "tone": "purple"
          },
          {
            "icon": "◈",
            "title": "Git snapshot",
            "sub": "Commit 349fdef",
            "tone": "green"
          }
        ],
        "foot": "The next commit can add Java code on top of this first snapshot."
      },
      {
        "type": "summary",
        "title": "What this tiny commit teaches",
        "intro": "Do not invent functionality that the source commit does not contain.",
        "points": [
          "A README explains the repository to future readers.",
          "A Git commit records the state of files at one point.",
          "The first commit contains no Java, web server, or database."
        ]
      }
    ]
  },
  "002": {
    "n": "002",
    "title": "The first Spring MVC skeleton",
    "strap": "Thirty-two files sketch the application: routes, Java controllers, models, web views, and build settings.",
    "sha": "f09d67cc1c216b445d01f1893f37ff391bb3b4b7",
    "meta": "Child of commit 001 · 32 new files",
    "date": "Git author date: May 5, 2009",
    "source": "https://github.com/spring-projects/spring-petclinic/commit/f09d67cc1c216b445d01f1893f37ff391bb3b4b7",
    "sections": [
      {
        "type": "compare",
        "title": "From description to a project structure",
        "intro": "The original commit message says “petclinic 3 initial commit - wip.” WIP means work in progress.",
        "before": {
          "title": "What commit 001 contained",
          "files": [
            "README.md"
          ],
          "caption": "A project name and short description."
        },
        "after": {
          "title": "What commit 002 adds",
          "files": [
            "pom.xml",
            "src/main/java/...",
            "src/main/webapp/WEB-INF/...",
            "Eclipse project settings"
          ],
          "caption": "A Java web-project scaffold, not yet a verified functioning application."
        }
      },
      {
        "type": "flow",
        "title": "What happens to a web request?",
        "intro": "Conceptual request-handling flow based on the XML configuration in this commit.",
        "items": [
          {
            "icon": "◧",
            "title": "Browser",
            "sub": "HTTP request",
            "tone": "blue"
          },
          {
            "icon": "⇢",
            "title": "web.xml",
            "sub": "/app/* → DispatcherServlet",
            "tone": "purple"
          },
          {
            "icon": "☕",
            "title": "Controller",
            "sub": "@RequestMapping",
            "tone": "green"
          },
          {
            "icon": "▣",
            "title": "JSP view",
            "sub": "/WEB-INF/*.jsp",
            "tone": "amber"
          }
        ],
        "foot": "The servlet routes application URLs. The Spring MVC view resolver is configured to locate JSPs in /WEB-INF. This is the intended design, not evidence that every route renders successfully."
      },
      {
        "type": "document",
        "title": "Read HomeController.java visually",
        "intro": "Only a few lines are needed to learn what a Spring MVC controller does.",
        "filename": "HomeController.java · condensed for teaching",
        "lines": [
          "@Controller",
          "public class HomeController {",
          "  @RequestMapping(value=\"/\",",
          "      method = RequestMethod.GET)",
          "  public void getHome() {",
          "  }",
          "}"
        ],
        "notes": [
          {
            "line": "1",
            "title": "A controller class",
            "body": "@Controller marks this Java class as a Spring MVC web handler."
          },
          {
            "line": "3–4",
            "title": "Match an HTTP request",
            "body": "@RequestMapping associates the root mapping and GET method with a handler."
          },
          {
            "line": "5–6",
            "title": "The method body is empty",
            "body": "This is an early scaffold, not the full business logic. No HTML is returned explicitly."
          }
        ]
      },
      {
        "type": "relation",
        "title": "Three jobs, two feature areas",
        "intro": "See how controller, repository interface, and data model are separate concepts.",
        "tracks": [
          {
            "name": "Owners",
            "nodes": [
              "OwnerController",
              "OwnerRepository",
              "Owner"
            ],
            "hints": [
              "Handles owner URLs",
              "Declares data actions",
              "Stores owner fields"
            ],
            "tone": "blue"
          },
          {
            "name": "Pets",
            "nodes": [
              "PetController",
              "PetRepository",
              "Pet"
            ],
            "hints": [
              "Handles pet URLs",
              "Declares data actions",
              "Stores pet fields"
            ],
            "tone": "purple"
          }
        ],
        "foot": "A repository interface describes operations; this specific commit does not yet introduce concrete repository implementation classes. Arrows show conceptual responsibilities, not a completed runtime data flow."
      },
      {
        "type": "document",
        "title": "Learn the OwnerRepository interface",
        "intro": "An interface tells other code which operations exist, without implementing those operations.",
        "filename": "OwnerRepository.java · signatures",
        "lines": [
          "public interface OwnerRepository {",
          "  Collection<Owner>",
          "    findOwnersByLastName(String lastName);",
          "  Owner getOwner(Long id);",
          "  void saveOwner(Owner owner);",
          "}"
        ],
        "notes": [
          {
            "line": "2–3",
            "title": "Find several owners",
            "body": "A last-name search can return a collection of Owner objects."
          },
          {
            "line": "4",
            "title": "Find one owner by ID",
            "body": "The method promises to return one Owner."
          },
          {
            "line": "5",
            "title": "Declare a save operation",
            "body": "The method has no SQL or method body. An implementation must provide the behavior."
          }
        ]
      },
      {
        "type": "tree",
        "title": "Understand the 32-file change without fear",
        "intro": "Start with the important folders; do not read every setting file at once.",
        "groups": [
          {
            "icon": "▤",
            "name": "pom.xml",
            "count": "1 file",
            "why": "Maven describes the build, WAR packaging, Spring 2.5.6 dependencies, and Java 5 compiler settings."
          },
          {
            "icon": "☕",
            "name": "src/main/java/",
            "count": "12 files",
            "why": "Home, owner, pet and utility Java classes — controllers, models, repository interfaces."
          },
          {
            "icon": "◩",
            "name": "src/main/webapp/WEB-INF/",
            "count": "5 files",
            "why": "home.jsp, web.xml, URL rewriting and two Spring XML configuration files."
          },
          {
            "icon": "⚙",
            "name": ".project · .classpath · .settings/ · .springBeans",
            "count": "12 files",
            "why": "Eclipse / Spring IDE project metadata, not application business logic."
          },
          {
            "icon": "≡",
            "name": "src/main/resources/ and src/test/resources/",
            "count": "2 files",
            "why": "Logging configuration for application and tests."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Old Spring: configuration has its own job",
        "intro": "This snapshot predates Spring Boot's modern auto-configuration conventions.",
        "items": [
          {
            "icon": "◫",
            "title": "pom.xml",
            "sub": "Build and libraries",
            "tone": "blue"
          },
          {
            "icon": "⇢",
            "title": "web.xml",
            "sub": "Servlet entrypoint",
            "tone": "purple"
          },
          {
            "icon": "✽",
            "title": "spring/*.xml",
            "sub": "Handlers + views",
            "tone": "green"
          },
          {
            "icon": "▣",
            "title": "home.jsp",
            "sub": "HTML template",
            "tone": "amber"
          }
        ],
        "foot": "These are different responsibilities, not a strict runtime call chain. The commit is a work-in-progress: the following commit's title says the app deploys and runs."
      },
      {
        "type": "summary",
        "title": "Your mental picture after commit 002",
        "intro": "The key is understanding responsibilities, not memorizing thirty-two files.",
        "points": [
          "Maven builds; Spring MVC handles web requests; JSP is a view technology.",
          "Controllers receive requests, models hold data, and repository interfaces define operations.",
          "This is a historical Spring 2.5.6 / Java 5 work-in-progress snapshot, not today's PetClinic."
        ]
      }
    ]
  }
};
