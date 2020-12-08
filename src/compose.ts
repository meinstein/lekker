export type Container = "head" | "body";

export interface TagSpec {
  container: Container;
  uniqueBy?: {
    tagName?: boolean;
    attribute?: string;
  };
}

export class LekkerCompose {
  _tagMap: { [tagName: string]: TagSpec };
  _tagsForHead: string[];
  _tagsForBody: string[];

  constructor() {
    this._tagMap = {
      a: {
        container: "body"
      },
      abbr: {
        container: "body"
      },
      address: {
        container: "body"
      },
      applet: {
        container: "body"
      },
      area: {
        container: "body"
      },
      article: {
        container: "body"
      },
      aside: {
        container: "body"
      },
      audio: {
        container: "body"
      },
      b: {
        container: "body"
      },
      base: {
        container: "head"
      },
      basefont: {
        container: "body"
      },
      bdi: {
        container: "body"
      },
      bdo: {
        container: "body"
      },
      blockquote: {
        container: "body"
      },
      body: {
        container: "body"
      },
      br: {
        container: "body"
      },
      button: {
        container: "body"
      },
      canvas: {
        container: "body"
      },
      caption: {
        container: "body"
      },
      cite: {
        container: "body"
      },
      code: {
        container: "body"
      },
      col: {
        container: "body"
      },
      colgroup: {
        container: "body"
      },
      data: {
        container: "body"
      },
      datalist: {
        container: "body"
      },
      dd: {
        container: "body"
      },
      del: {
        container: "body"
      },
      details: {
        container: "body"
      },
      dfn: {
        container: "body"
      },
      dialog: {
        container: "body"
      },
      dir: {
        container: "body"
      },
      div: {
        container: "body"
      },
      dl: {
        container: "body"
      },
      dt: {
        container: "body"
      },
      em: {
        container: "body"
      },
      embed: {
        container: "body"
      },
      fieldset: {
        container: "body"
      },
      figcaption: {
        container: "body"
      },
      figure: {
        container: "body"
      },
      font: {
        container: "body"
      },
      footer: {
        container: "body"
      },
      form: {
        container: "body"
      },
      frame: {
        container: "body"
      },
      frameset: {
        container: "body"
      },
      h1: {
        container: "body"
      },
      h2: {
        container: "body"
      },
      h3: {
        container: "body"
      },
      h4: {
        container: "body"
      },
      h5: {
        container: "body"
      },
      h6: {
        container: "body"
      },
      head: {
        container: "body"
      },
      header: {
        container: "body"
      },
      hgroup: {
        container: "body"
      },
      hr: {
        container: "body"
      },
      html: {
        container: "body"
      },
      i: {
        container: "body"
      },
      iframe: {
        container: "body"
      },
      img: {
        container: "body"
      },
      input: {
        container: "body"
      },
      ins: {
        container: "body"
      },
      kbd: {
        container: "body"
      },
      label: {
        container: "body"
      },
      legend: {
        container: "body"
      },
      li: {
        container: "body"
      },
      link: {
        container: "head"
      },
      main: {
        container: "body",
        uniqueBy: {
          tagName: true
        }
      },
      map: {
        container: "body"
      },
      mark: {
        container: "body"
      },
      marquee: {
        container: "body"
      },
      menu: {
        container: "body"
      },
      meta: {
        container: "head",
        uniqueBy: {
          attribute: "name"
        }
      },
      meter: {
        container: "body"
      },
      nav: {
        container: "body"
      },
      noscript: {
        container: "head"
      },
      object: {
        container: "body"
      },
      ol: {
        container: "body"
      },
      optgroup: {
        container: "body"
      },
      option: {
        container: "body"
      },
      output: {
        container: "body"
      },
      p: {
        container: "body"
      },
      param: {
        container: "body"
      },
      picture: {
        container: "body"
      },
      pre: {
        container: "body"
      },
      progress: {
        container: "body"
      },
      q: {
        container: "body"
      },
      rp: {
        container: "body"
      },
      rt: {
        container: "body"
      },
      ruby: {
        container: "body"
      },
      s: {
        container: "body"
      },
      samp: {
        container: "body"
      },
      script: {
        container: "head"
      },
      section: {
        container: "body"
      },
      select: {
        container: "body"
      },
      slot: {
        container: "body"
      },
      small: {
        container: "body"
      },
      source: {
        container: "body"
      },
      span: {
        container: "body"
      },
      strong: {
        container: "body"
      },
      style: {
        container: "head"
      },
      sub: {
        container: "body"
      },
      summary: {
        container: "body"
      },
      sup: {
        container: "body"
      },
      table: {
        container: "body"
      },
      tbody: {
        container: "body"
      },
      td: {
        container: "body"
      },
      template: {
        container: "head"
      },
      textarea: {
        container: "body"
      },
      tfoot: {
        container: "body"
      },
      th: {
        container: "body"
      },
      thead: {
        container: "body"
      },
      time: {
        container: "body"
      },
      title: {
        container: "head",
        uniqueBy: {
          tagName: true
        }
      },
      tr: {
        container: "body"
      },
      track: {
        container: "body"
      },
      u: {
        container: "body"
      },
      ul: {
        container: "body"
      },
      var: {
        container: "body"
      },
      video: {
        container: "body"
      },
      wbr: {
        container: "body"
      }
    };

    this._tagsForHead = Object.keys(this._tagMap).filter((tagName) => {
      return this._tagMap[tagName].container === "head";
    });

    this._tagsForBody = Object.keys(this._tagMap).filter((tagName) => {
      return this._tagMap[tagName].container === "body";
    });
  }
}
