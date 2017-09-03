/* License: Apache 2.0. See LICENSE file in root directory.
   Copyright(c) 2017 Intel Corporation. All Rights Reserved. */

'use strict';

const glfw = require('node-glfw-2');

class GLFWWindow {
  constructor(width = 1280, height = 720, title) {
    this.width_ = width;
    this.height_ = height;

    glfw.Init();
    glfw.DefaultWindowHints();
    this.window_ = glfw.CreateGLFWWindow(width, height, title);
    glfw.MakeContextCurrent(this.window_);

    // Enable vertical sync (on cards that support it)
    glfw.SwapInterval(1); // 0 for vsync off
  }

  get width() {
    return this.width_;
  }

  get height() {
    return this.height_;
  }

  get window() {
    return this.window_;
  }

  shouldWindowClose() {
    let result = glfw.WindowShouldClose(this.window_);
    if (! result) {
      result = glfw.GetKey(this.window_, glfw.KEY_ESCAPE);
    }
    return result;
  }

  beginPaint() {
    // We don't clear buffer for now, because
    //  there is currently sync issue between depth & color stream
    //
    // glfw.ClearColorBuffer();
  }

  endPaint() {
    glfw.PopMatrix();
    glfw.SwapBuffers(this.window);
    glfw.PollEvents();
    glfw.PushMatrix();
    glfw.Ortho(0, this.width_, this.height_, 0, -1, +1);
  }

  destroy() {
    glfw.DestroyWindow(this.window_);
    glfw.Terminate();
    this.window_ = undefined;
  }
}

module.exports.GLFWWindow = GLFWWindow;
module.exports.glfw = glfw;