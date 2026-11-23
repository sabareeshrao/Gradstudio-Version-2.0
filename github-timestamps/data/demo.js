// Fictional project only. Spring PetClinic history will be imported after review.
export const project = {
  owner: 'demo-lab', name: 'mini-orders', startMinute: 23 * 60 + 43,
  subtitle: 'A fictional Java 21 project · no Spring PetClinic history loaded',
  commits: [
    {sha:'a19f401',title:'Bootstrap Java project',order:'git',files:[
      {path:'pom.xml',language:'xml',lines:[
        '<project xmlns="http://maven.apache.org/POM/4.0.0">',
        '    <modelVersion>4.0.0</modelVersion>',
        '    <groupId>dev.demo</groupId>',
        '    <artifactId>mini-orders</artifactId>',
        '    <version>0.1.0</version>',
        '    <properties>',
        '        <maven.compiler.release>21</maven.compiler.release>',
        '    </properties>',
        '</project>'
      ]},
      {path:'src/main/java/dev/demo/MiniOrdersApplication.java',language:'java',lines:[
        'package dev.demo;',
        '',
        'public class MiniOrdersApplication {',
        '    public static void main(String[] args) {',
        '        System.out.println("Mini Orders started");',
        '    }',
        '}'
      ]}
    ]},
    {sha:'b87e309',title:'Add ordering workflow',order:'logical',files:[
      {path:'src/main/java/dev/demo/model/Order.java',language:'java',lines:[
        'package dev.demo.model;',
        '',
        'public record Order(',
        '        long id,',
        '        String customerId,',
        '        int quantity,',
        '        String status',
        ') {}'
      ]},
      {path:'src/main/java/dev/demo/repository/OrderRepository.java',language:'java',lines:[
        'package dev.demo.repository;',
        '',
        'import java.util.Map;',
        'import java.util.concurrent.ConcurrentHashMap;',
        'import dev.demo.model.Order;',
        '',
        'public class OrderRepository {',
        '    private final Map<Long, Order> orders = new ConcurrentHashMap<>();',
        '    public void save(Order order) {',
        '        orders.put(order.id(), order);',
        '    }',
        '}'
      ]},
      {path:'src/main/java/dev/demo/service/OrderService.java',language:'java',lines:[
        'package dev.demo.service;',
        '',
        'import dev.demo.model.Order;',
        'import dev.demo.repository.OrderRepository;',
        '',
        'public class OrderService {',
        '    private final OrderRepository repository;',
        '',
        '    public OrderService(OrderRepository repository) {',
        '        this.repository = repository;',
        '    }',
        '',
        '    public Order place(long id, String customerId, int quantity) {',
        '        Order order = new Order(id, customerId, quantity, "PENDING");',
        '        repository.save(order);',
        '        return order;',
        '    }',
        '}'
      ]},
      {path:'src/main/java/dev/demo/web/OrderController.java',language:'java',lines:[
        'package dev.demo.web;',
        '',
        'import dev.demo.model.Order;',
        'import dev.demo.service.OrderService;',
        '',
        'public class OrderController {',
        '    private final OrderService service;',
        '',
        '    public OrderController(OrderService service) {',
        '        this.service = service;',
        '    }',
        '',
        '    public Order submit(long id, String customer, int qty) {',
        '        return service.place(id, customer, qty);',
        '    }',
        '}'
      ]},
      {path:'src/main/resources/application.properties',language:'properties',lines:[
        'app.name=mini-orders',
        'app.orders.max-quantity=10'
      ]}
    ]},
    {sha:'c2f4a91',title:'Validate quantity before saving',order:'git',changes:[
      {path:'src/main/java/dev/demo/service/OrderService.java',deleteText:'        repository.save(order);',insert:[
        '        if (quantity <= 0) {',
        '            throw new IllegalArgumentException("Quantity must be positive");',
        '        }',
        '        repository.save(order);'
      ]}
    ]}
  ]
};