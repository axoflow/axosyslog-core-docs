<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
              xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              version="1.0">
  <xsl:output method="text" encoding="UTF-8"
              omit-xml-declaration="yes"
              indent="no"
              media-type="text/plain" />

  <xsl:param name="section">7</xsl:param>
  <xsl:param name="name"><xsl:choose>
  <xsl:when test="//xhtml:meta[@name='unix:name']"><xsl:value-of select="//xhtml:meta[@name='unix:name']/@content"/></xsl:when>
  <xsl:otherwise><xsl:value-of select="//xhtml:name"/></xsl:otherwise>
</xsl:choose></xsl:param>

<xsl:template match="xhtml:body">
<xsl:if test="../xhtml:head/xhtml:meta[@name='unix:name']">
.SH NAME
.PP
<xsl:value-of select="../xhtml:head/xhtml:meta[@name='unix:name']/@content"/> - <xsl:value-of select="../xhtml:head/xhtml:title"/>
</xsl:if>
<xsl:if test="../xhtml:head/xhtml:meta[@name='description']">
.SH DESCRIPTION
.PP
<xsl:value-of select="../xhtml:head/xhtml:meta[@name='description']/@content"/>
</xsl:if>
<xsl:apply-templates select="*"/>
<xsl:if test="../xhtml:head/xhtml:meta[@name='author']">
.SH AUTHOR
.PP
This article was written by:
.AU
<xsl:value-of select="../xhtml:head/xhtml:meta[@name='author']/@content"/>
</xsl:if>
</xsl:template>

<xsl:template match="xhtml:title">
.TH "<xsl:value-of select="$name"/>" <xsl:value-of select="$section"/> "<xsl:choose>
  <xsl:when test="../xhtml:meta[@name='mtime']"><xsl:value-of select="../xhtml:meta[@name='mtime']/@content"/></xsl:when>
  <xsl:when test="../xhtml:meta[@name='date']"><xsl:value-of select="../xhtml:meta[@name='date']/@content"/></xsl:when>
  <xsl:otherwise>-</xsl:otherwise>
</xsl:choose>" "" "<xsl:value-of select="."/>"
</xsl:template>

<xsl:template match="xhtml:h1">
.SH "<xsl:apply-templates select="*|text()"/>"
</xsl:template>
<xsl:template match="xhtml:h2">
.SS "<xsl:apply-templates select="*|text()"/>"
</xsl:template>
<xsl:template match="xhtml:h3">
.SS "<xsl:apply-templates select="*|text()"/>"
</xsl:template>
<xsl:template match="xhtml:h4">
.SS "<xsl:apply-templates select="*|text()"/>"
</xsl:template>
<xsl:template match="xhtml:h5">
.SS "<xsl:apply-templates select="*|text()"/>"
</xsl:template>
<xsl:template match="xhtml:h6">
.SS "<xsl:apply-templates select="*|text()"/>"
</xsl:template>

<xsl:template match="xhtml:p">
.PP
<xsl:apply-templates select="*|text()"/>
</xsl:template>

<xsl:template match="text()"><xsl:value-of select="."/></xsl:template>

<xsl:template match="xhtml:a[@href]">\fB<xsl:apply-templates select="*|text()"/>\fP (\fI<xsl:value-of select="@href"/>\fP)</xsl:template>
<xsl:template match="xhtml:a[not(@href)]"><xsl:apply-templates select="*|text()"/></xsl:template>
<xsl:template match="xhtml:em">\fI<xsl:value-of select="."/>\fP</xsl:template>

<xsl:template match="xhtml:img">\fB[IMAGE: <xsl:value-of select="@alt"/>\fP (\fI<xsl:value-of select="@src"/>\fP)\fB]\fP</xsl:template>

<xsl:template match="xhtml:del">\fI(deleted: <xsl:value-of select="."/>)\fP</xsl:template>
<xsl:template match="xhtml:ins">\fB(inserted: <xsl:value-of select="."/>)\fP</xsl:template>

<xsl:template match="xhtml:ul">
.RS
<xsl:apply-templates select="*"/>
.RE
</xsl:template>

<xsl:template match="xhtml:ol">
.nr step 1 1
.RS
<xsl:apply-templates select="*"/>
.RE
</xsl:template>

<xsl:template match="xhtml:dl">
.RS
<xsl:apply-templates select="*"/>
.RE
</xsl:template>

<xsl:template match="xhtml:ul/xhtml:li">
<xsl:choose>
  <xsl:when test="preceding-sibling::xhtml:li">
.IP \[bu]
<xsl:apply-templates select="*|text()"/></xsl:when>
  <xsl:otherwise>
.IP \[bu] 2
<xsl:apply-templates select="*|text()"/></xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="xhtml:ol/xhtml:li">
<xsl:choose>
  <xsl:when test="preceding-sibling::xhtml:li">
.IP \n+[step]
<xsl:apply-templates select="*|text()"/></xsl:when>
  <xsl:otherwise>
.IP \n[step] 3
<xsl:apply-templates select="*|text()"/></xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="xhtml:dt">
.IP "<xsl:apply-templates select="*|text()"/>"
</xsl:template>

<xsl:template match="xhtml:dd">
<xsl:apply-templates select="*|text()"/>
</xsl:template>

<xsl:template match="xhtml:pre">
.PP
.RS
.DS L
.nf
<xsl:value-of select="."/>
.fi
.DE
.RE
</xsl:template>

<xsl:template match="xhtml:script" />
<xsl:template match="xhtml:style" />

</xsl:stylesheet>
