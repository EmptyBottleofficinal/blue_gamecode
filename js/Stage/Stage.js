/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.lineCode = 1;
    this.vars.varRead = 1;
    this.vars.code = [];
    this.vars.shell = [];
    this.vars.var = [];

    this.watchers.code = new Watcher({
      label: "code",
      style: "normal",
      visible: true,
      value: () => this.vars.code,
      x: 240,
      y: 180,
      width: 480,
      height: 257,
    });
    this.watchers.shell = new Watcher({
      label: "shell",
      style: "normal",
      visible: true,
      value: () => this.vars.shell,
      x: 240,
      y: -57,
      width: 480,
      height: 165,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.var = [];
    this.vars.shell = [];
    yield* this.askAndWait("1.delete 2.add code 3.run");
    if (this.toNumber(this.answer) === 1) {
      yield* this.askAndWait("1.single line 2.all");
      if (this.toNumber(this.answer) === 1) {
        yield* this.askAndWait("line number:");
        this.vars.code.splice(this.answer - 1, 1);
      }
      if (this.toNumber(this.answer) === 2) {
        this.vars.code = [];
      }
    } else {
      if (this.toNumber(this.answer) === 2) {
        yield* this.askAndWait("line:");
        if (
          this.compare(this.vars.code.length + 1, this.answer) < 0 ||
          this.compare(1, this.answer) > 0 ||
          (this.stringIncludes(this.answer, "0") &&
            this.stringIncludes(this.answer, "1") &&
            this.stringIncludes(this.answer, "2") &&
            this.stringIncludes(this.answer, "3") &&
            this.stringIncludes(this.answer, "4") &&
            this.stringIncludes(this.answer, "5") &&
            this.stringIncludes(this.answer, "6") &&
            this.stringIncludes(this.answer, "7") &&
            this.stringIncludes(this.answer, "9") &&
            this.stringIncludes(this.answer, "8"))
        ) {
          this.vars.shell.push("please put a right line");
        } else {
          this.vars.code.splice(this.answer - 1, 0, "<empty code yet>");
          yield* this.askAndWait("code:");
          this.vars.code.splice(
            this.indexInArray(this.vars.code, "<empty code yet>"),
            1,
            this.answer
          );
        }
      } else {
        if (this.toNumber(this.answer) === 3) {
          yield* this.run();
        }
      }
    }
  }

  *run() {
    this.vars.lineCode = 0;
    for (let i = 0; i < this.vars.code.length; i++) {
      this.vars.lineCode++;
      if (
        this.toString(/* TODO: Implement strings_letters_of */ null) === "say="
      ) {
        if (
          this.toBoolean(
            /* TODO: Implement skyhigh173JSON_json_is_valid */ null
          )
        ) {
          this.vars.shell.push(/* TODO: Implement strings_replace */ null);
        } else {
          null;
        }
      } else {
        if (
          this.toString(/* TODO: Implement strings_letters_of */ null) ===
          "ask="
        ) {
          if (
            this.toBoolean(
              /* TODO: Implement skyhigh173JSON_json_is_valid */ null
            )
          ) {
            yield* this.askAndWait(/* TODO: Implement strings_replace */ null);
            this.vars.shell.push(
              this.toString(/* TODO: Implement strings_replace */ null) +
                this.answer
            );
          } else {
            this.vars.shell.push("error");
          }
        } else {
          if (
            this.toString(/* TODO: Implement strings_letters_of */ null) ===
            "ask="
          ) {
            if (
              this.toBoolean(
                /* TODO: Implement skyhigh173JSON_json_is_valid */ null
              )
            ) {
              yield* this.askAndWait(
                /* TODO: Implement strings_replace */ null
              );
              this.vars.shell.push(
                this.toString(/* TODO: Implement strings_replace */ null) +
                  this.answer
              );
            } else {
              this.vars.shell.push("error");
            }
          } else {
            if (
              this.toString(
                this.itemOf(this.vars.code, this.vars.lineCode - 1)
              ) === "exit()"
            ) {
              return;
            } else {
              if (
                this.toString(/* TODO: Implement strings_letters_of */ null) ===
                "var:"
              ) {
                yield* this.var();
              } else {
                null;
              }
            }
          }
        }
      }
      yield;
    }
  }

  *var() {
    if (
      ":add" === this.toString(/* TODO: Implement strings_letters_of */ null)
    ) {
      if (
        this.toBoolean(
          /* TODO: Implement skyhigh173JSON_json_is_valid */ null
        ) &&
        this.toNumber(/* TODO: Implement skyhigh173JSON_json_length */ null) ===
          2
      ) {
        this.vars.var.push(/* TODO: Implement strings_replace */ null);
      } else {
        this.vars.shell.push("error");
      }
    } else {
      null;
    }
  }
}
