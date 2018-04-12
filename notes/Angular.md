## Data binding

### Interpolations
One way: js to HTML. `{{title}}` will be replaced with the component's title field.

### Property binding
Put a property key in square brackets and set its value to a component field. At runtime, the value will be set to the value of the field.

### Event Binding
`<button (click)="showMessage()">Show Message</button>` The component's `showMessage` method will be used as the click handler.

### Two way binding
Use the `ngModel` directive.

`<input [(ngModel)]="name">` will bind the value of the input element to the `name` field of the component.

## Components and Services
Components should focus on UI/UX. Any other logic should be put in a service. A service is a class needed by other objects/components. A Component is a class decorator or a class so decorated or an instance of such a class.

If an object will need a service/some services, they should be created by the object's creator and passed into the object's constructor. This is a good dependency injection pattern.

Angular2 component decorators provide some fancy support for this that I don't understand yet.



