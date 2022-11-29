import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataService } from '../shared/data.service';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should pull the user name from the user service", () => {
    let userService = fixture.debugElement.injector.get(UserService);
    expect(component.user.name).toEqual(userService.user.name);
  });

  it("should display the user name if the user is logged in", () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p")?.textContent).toContain(
      component.user.name
    );
  });

  it("shouldn't display the user name if the user is logged out", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p")?.textContent).not.toContain(
      component.user.name
    );
  });
  it("should fail fetch data if called synchronously", () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    expect(component.data).toBe(undefined!);
  });

  it("should fetch data successfully if called asynchronously", async(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe("Data");
    });
  }));

});
