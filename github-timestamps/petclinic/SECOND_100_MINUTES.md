# Spring Petclinic — Minutes 101–200

**D01 01:41–D01 03:20 (inclusive)** · Steps 101–200.

This report uses the pinned source and Git blame evidence. Minute timestamps, typing order, and shell commands are reconstructed.

| Event kind | Count |
|---|---:|
| add | 84 |
| save | 8 |
| terminal | 8 |

## Feature additions, grouped by upstream commit and file

## SPR-6447 SPR-6448 + commit the gross of the files + added maven pom
Upstream Git commit: [521d01db950e](https://github.com/spring-projects/spring-petclinic/commit/521d01db950e357cf81ef78c50daf290e92b309c)

### src/main/java/org/springframework/samples/petclinic/vet/Vet.java · 10 surviving code lines · D01 01:41–D01 01:51

~~~java
 * @author Sam Brannen
 * @author Arjen Poutsma
 */






}
~~~

Line-by-line timestamps:
- D01 01:41 · L40: " * @author Sam Brannen"
- D01 01:42 · L41: " * @author Arjen Poutsma"
- D01 01:43 · L42: " */"
- D01 01:44 · L46: ""
- D01 01:45 · L51: ""
- D01 01:46 · L58: ""
- D01 01:47 · L65: ""
- D01 01:49 · L69: ""
- D01 01:50 · L73: ""
- D01 01:51 · L74: "}"

### src/main/java/org/springframework/samples/petclinic/owner/PetValidator.java · 12 surviving code lines · D01 01:53–D01 02:05

~~~java

import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;

/**
 * <code>Validator</code> for <code>Pet</code> forms.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */

}
~~~

Line-by-line timestamps:
- D01 01:53 · L17: ""
- D01 01:54 · L18: "import org.springframework.util.StringUtils;"
- D01 01:55 · L19: "import org.springframework.validation.Errors;"
- D01 01:56 · L21: ""
- D01 01:57 · L22: "/**"
- D01 01:58 · L23: " * <code>Validator</code> for <code>Pet</code> forms."
- D01 01:59 · L28: " *"
- D01 02:01 · L29: " * @author Ken Krebs"
- D01 02:02 · L30: " * @author Juergen Hoeller"
- D01 02:03 · L31: " */"
- D01 02:04 · L33: ""
- D01 02:05 · L69: "}"

### src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java · 15 surviving code lines · D01 02:07–D01 02:22

~~~java

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller


}
~~~

Line-by-line timestamps:
- D01 02:07 · L17: ""
- D01 02:08 · L25: "import org.springframework.stereotype.Controller;"
- D01 02:09 · L26: "import org.springframework.ui.Model;"
- D01 02:10 · L27: "import org.springframework.validation.BindingResult;"
- D01 02:11 · L28: "import org.springframework.web.bind.WebDataBinder;"
- D01 02:12 · L36: ""
- D01 02:14 · L41: "/**"
- D01 02:15 · L42: " * @author Juergen Hoeller"
- D01 02:16 · L43: " * @author Ken Krebs"
- D01 02:17 · L44: " * @author Arjen Poutsma"
- D01 02:18 · L47: " */"
- D01 02:19 · L48: "@Controller"
- D01 02:20 · L50: ""
- D01 02:21 · L187: ""
- D01 02:22 · L188: "}"

### src/main/java/org/springframework/samples/petclinic/owner/PetController.java · 11 surviving code lines · D01 02:24–D01 02:35

~~~java
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller

}
~~~

Line-by-line timestamps:
- D01 02:24 · L24: "import org.springframework.stereotype.Controller;"
- D01 02:26 · L28: "import org.springframework.validation.BindingResult;"
- D01 02:27 · L29: "import org.springframework.web.bind.WebDataBinder;"
- D01 02:28 · L41: "/**"
- D01 02:29 · L42: " * @author Juergen Hoeller"
- D01 02:30 · L43: " * @author Ken Krebs"
- D01 02:31 · L44: " * @author Arjen Poutsma"
- D01 02:32 · L46: " */"
- D01 02:33 · L47: "@Controller"
- D01 02:34 · L50: ""
- D01 02:35 · L207: "}"

### src/main/java/org/springframework/samples/petclinic/owner/VisitController.java · 17 surviving code lines · D01 02:37–D01 02:55

~~~java

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller





}
~~~

Line-by-line timestamps:
- D01 02:37 · L17: ""
- D01 02:39 · L22: "import org.springframework.stereotype.Controller;"
- D01 02:40 · L23: "import org.springframework.validation.BindingResult;"
- D01 02:41 · L24: "import org.springframework.web.bind.WebDataBinder;"
- D01 02:42 · L30: ""
- D01 02:43 · L34: "/**"
- D01 02:44 · L35: " * @author Juergen Hoeller"
- D01 02:45 · L36: " * @author Ken Krebs"
- D01 02:46 · L37: " * @author Arjen Poutsma"
- D01 02:47 · L41: " */"
- D01 02:48 · L42: "@Controller"
- D01 02:49 · L44: ""
- D01 02:51 · L46: ""
- D01 02:52 · L50: ""
- D01 02:53 · L82: ""
- D01 02:54 · L94: ""
- D01 02:55 · L114: "}"

### src/test/java/org/springframework/samples/petclinic/service/EntityUtils.java · 13 surviving code lines · D01 02:58–D01 03:11

~~~java


import org.springframework.orm.ObjectRetrievalFailureException;

/**
 *
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
public abstract class EntityUtils {


}
~~~

Line-by-line timestamps:
- D01 02:58 · L16: ""
- D01 02:59 · L18: ""
- D01 03:00 · L19: "import org.springframework.orm.ObjectRetrievalFailureException;"
- D01 03:01 · L21: ""
- D01 03:02 · L24: "/**"
- D01 03:04 · L27: " *"
- D01 03:05 · L28: " * @author Juergen Hoeller"
- D01 03:06 · L29: " * @author Sam Brannen"
- D01 03:07 · L32: " */"
- D01 03:08 · L33: "public abstract class EntityUtils {"
- D01 03:09 · L34: ""
- D01 03:10 · L52: ""
- D01 03:11 · L53: "}"

### src/main/java/org/springframework/samples/petclinic/owner/PetType.java · 6 surviving code lines · D01 03:13–D01 03:19

~~~java

/**
 */
public class PetType extends NamedEntity {

}
~~~

Line-by-line timestamps:
- D01 03:13 · L17: ""
- D01 03:14 · L23: "/**"
- D01 03:15 · L25: " */"
- D01 03:17 · L28: "public class PetType extends NamedEntity {"
- D01 03:18 · L29: ""
- D01 03:19 · L30: "}"

### Terminal and editor actions
- D01 01:48 · save: Save editor buffer · reconstructed
- D01 01:52 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/owner/PetValidator.java'`
- D01 02:00 · save: Save editor buffer · reconstructed
- D01 02:06 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java'`
- D01 02:13 · save: Save editor buffer · reconstructed
- D01 02:23 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/owner/PetController.java'`
- D01 02:25 · save: Save editor buffer · reconstructed
- D01 02:36 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/owner/VisitController.java'`
- D01 02:38 · save: Save editor buffer · reconstructed
- D01 02:50 · save: Save editor buffer · reconstructed
- D01 02:56 · terminal:  `mkdir -p 'src/test/java/org/springframework/samples/petclinic/service'`
- D01 02:57 · terminal:  `touch 'src/test/java/org/springframework/samples/petclinic/service/EntityUtils.java'`
- D01 03:03 · save: Save editor buffer · reconstructed
- D01 03:12 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/owner/PetType.java'`
- D01 03:16 · save: Save editor buffer · reconstructed
- D01 03:20 · terminal:  `touch 'src/main/java/org/springframework/samples/petclinic/vet/Specialty.java'`

## Source and timing audit

- Steps 101–200 only; exactly 100 event slots.
- File content is transcribed from the pinned final source snapshot.
- Real Git commit SHA provenance; reconstructed code-writing order and terminal actions.
- No guarantee that this partial replay represents a compilable project at these timestamps.
